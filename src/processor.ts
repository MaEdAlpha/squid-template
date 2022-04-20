import * as ss58 from "@subsquid/ss58";
import {
  ExtrinsicHandlerContext,
  Store,
  SubstrateProcessor,
} from "@subsquid/substrate-processor";
import { lookupArchive } from "@subsquid/archive-registry";
import { Remarks } from "./model/generated/remarks.model";
import { Base } from "./model/generated/base.model";
import { getBatchAllExtrinsic, getRemarksExtrinsic } from "./extrinsic_helpers";
import { BASE_TAG, COLLECTION_BASE_TAG, COLLECTION_ITEM_TAG, ISSUER , ITEMS_TAG, RMRK_COMMAND} from "./constants";
import {
  getBaseRMRK,
  getCreateRMRK,
  getMintRMRK,
  getResourceAddRMRK,
  getSetPriorityRMRK,
  getSendRMRK,
  getEquipRMRK } from "./store_rmrk";
import { BaseParts, BatchAll, Collections, EquippableParts, FixedParts, NFTS, Properties } from "./model";
import { Buffer } from 'buffer';

const processor = new SubstrateProcessor("kusama_balances");

processor.setBatchSize(500);
processor.setDataSource({
  archive: lookupArchive("kusama")[0].url,
  chain: "wss://kusama-rpc.polkadot.io",
});

processor.setBlockRange({from:12099600, to: 12400000});

processor.addExtrinsicHandler("system.remark", processRemarks);
processor.addExtrinsicHandler("utility.batch_all",processBatchAll);

processor.run();

//remove, do not need this.

async function processRemarks(ctx: ExtrinsicHandlerContext): Promise<void> {

  try{
    const remarksData = getRemarksExtrinsic(ctx); //remark string you need to parse.
  
    const remark =  await getOrCreate(ctx.store, Remarks, ctx.extrinsic.id.toString());
    remark.remarks = remarksData.toString();
    await ctx.store.save(remark);

    await parseRMRKData(remarksData.toString(), ctx); //send data in to save to db.

  } catch(e) {
    console.log(e);
  } 
}

async function processBatchAll(ctx: ExtrinsicHandlerContext): Promise<void> {
  try{
    // const batchedRemarks = getBatchAllExtrinsic(ctx); // should return an array.
    // console.log(batchedRemarks);
    let ksmHackObject: any = ctx.extrinsic.args[0].value;
    const filteredData = ksmHackObject.filter( (arg: { args: any, callIndex: string; }) => {
      if(arg.callIndex === '0x0001' && !arg.args.remark.toString().includes("3A3A312A302A303A3A") ){ //filters out ::1.0.0::
        
        let hexStr = arg.args.remark.toString().slice(2);
        const buf = Buffer.from(hexStr, 'hex' );
        const remarkString = buf.toString('utf8');

        if(remarkString.toLowerCase().includes("-wgl")){
          //console.log(remarkString); //DEBUG
          return true;
        }
        return false;
      }
    });

    if( filteredData.length > 0 ){
      //process remarkData.
      for( let i = 0; i < filteredData.length; i++){

        let hexStr = filteredData[i].args.remark.toString().slice(2);
        const buf = Buffer.from(hexStr, 'hex' );
        const remarkString = buf.toString('utf8');

        await parseRMRKData(remarkString, ctx);
      }
    }

  }catch(e){
    console.log("BatchAll error: ");
    console.log(e);
  }
}



async function getOrCreate<T extends { id: string }>(
  store: Store,
  EntityConstructor: EntityConstructor<T>,
  id: string
): Promise<T> {
  let entity = await store.get<T>(EntityConstructor, {
    where: { id },
  });

  if (entity == null) {
    entity = new EntityConstructor();
    entity.id = id;
  }

  return entity;
}

async function parseRMRKData(rmrk:string, ctx: ExtrinsicHandlerContext): Promise<void> {
  //unpack
  const [name, command, ver, content1, content2, content3 ] = rmrk.split('::');
  if(name !== 'RMRK' || ver !== '2.0.0'){
    //skip parse, data is not relevant.
    return;
  } else {

    if(rmrk.includes(BASE_TAG) || rmrk.includes(ITEMS_TAG)){
      console.log(rmrk);
    }

    switch(command) {
      case RMRK_COMMAND.BASE:
        if(ctx.extrinsic.signer === ISSUER){ 
          const baseObj = await getBaseRMRK(content1);
            const baseID = 'base-'+ ctx.block.height + '-' + baseObj.symbol;
            const nftBases = await getOrCreate(ctx.store, Base, baseID);
            // console.log("Block height: ", ctx.block.height);
            // console.log("Signer: ", ctx.extrinsic.signer);
            // console.log(baseObj.parts?.forEach(part => console.log(part)));
            // cannot do below, changes Type to Object literal, removes Entity type.
            // nftBases = {...baseObj, id: baseID, type: 'svg'}
            nftBases.id = baseID;
            nftBases.block = ctx.block.height;
            nftBases.symbol = baseObj.symbol;
            nftBases.issuer = baseObj.issuer;
            //.map() not necessary, maybe keep for now when testing bugs
            nftBases.parts = baseObj.parts?.map(part=>{ return part!.hasOwnProperty("equippable") ? new EquippableParts(part as EquippableParts) : new FixedParts(part as FixedParts)});
            nftBases.type = "svg";
    
            await ctx.store.save(nftBases);
          
        }


        break;

      case RMRK_COMMAND.CREATE:
        //Collection creation
        if(ctx.extrinsic.signer === ISSUER){
          const collectionObj = await getCreateRMRK(content1);
          if(collectionObj){
            
            const nftCollection = await getOrCreate(ctx.store, Collections, collectionObj.id);
            
            nftCollection.block = ctx.block.height;
            nftCollection.max = collectionObj.max;
            nftCollection.issuer = collectionObj.issuer;
            nftCollection.metadata = collectionObj.metadata;
            nftCollection.id = collectionObj.id;
            nftCollection.changes = collectionObj.changes ? collectionObj.changes : [];
            nftCollection.symbol = collectionObj.symbol;
            console.log(`wrote Collection: ${nftCollection.id}`)
            await ctx.store.save(nftCollection);
          }
        }
        break;

      case RMRK_COMMAND.MINT:
        //Mint multiple cases now
        const nft = await getMintRMRK(content1);
        const nftRecordID = `${ctx.block.height}-${nft.collection}-${nft.symbol}-${nft.sn}`;
        const nftAsset = await getOrCreate(ctx.store, NFTS, nftRecordID);
        const parentNFT = nft.collection.endsWith(COLLECTION_ITEM_TAG);
        const childNFT = nft.collection.endsWith(COLLECTION_BASE_TAG);
        if(parentNFT){  //change collection to MUN1V3RS31TMS
          //I am equippable

          let properties = new Properties({...nft.properties});
          nftAsset.block = ctx.block.height;
          nftAsset.collection = nft.collection;
          nftAsset.symbol = nft.symbol;
          nftAsset.transferable = nft.transferable;
          nftAsset.sn = nft.sn;
          nftAsset.metadata =nft.metadata;
          nftAsset.owner = ISSUER;
          nftAsset.rootowner = ISSUER;
          nftAsset.forsale = "addIntoMintingCode";
          nftAsset.properties = nft.properties;
          nftAsset.pending = false;
          nftAsset.id = nftRecordID;
          console.log(nftAsset);
          await ctx.store.save(nftAsset).then(()=>{
            console.log("NFT Successful!");
          }).catch((e)=>{
            console.log('NFT SaveError: ', e);
          });
        } else if(childNFT){  //change collection to MUN1V3RS31TMS
          //I am equippable  
 
          nftAsset.block = ctx.block.height;
          nftAsset.collection = nft.collection;
          nftAsset.symbol = nft.symbol;
          nftAsset.transferable = nft.transferable;
          nftAsset.sn = nft.sn;
          nftAsset.metadata =nft.metadata;
          nftAsset.owner = ISSUER;
          nftAsset.rootowner = ISSUER;
          nftAsset.forsale = "addIntoMintingCode";
          nftAsset.properties = nft.properties;
          nftAsset.pending = false;
          nftAsset.id = nftRecordID;
          console.log(nftAsset);
          await ctx.store.save(nftAsset).then(()=>{
            console.log("NFT CHILD Successful!");
          }).catch((e)=>{
            console.log('NFT SaveError: ', e);
          });
        } 

        break;

      case RMRK_COMMAND.RESADD:
        if(content2){
          const resourceObject = await getResourceAddRMRK(content2);
          const resourceID = content1;
          console.log(ctx.block.height);
          if(resourceID.includes(BASE_TAG) || resourceID.includes(ITEMS_TAG)){
            console.log(resourceID);
            console.log(resourceObject);
          } 
  
          const addResourceToNFT = await getOrCreate(ctx.store, NFTS, resourceID);
          
          if(resourceID.includes(BASE_TAG)){
            addResourceToNFT.resources?.push(resourceObject);
            ctx.store.save(addResourceToNFT).then(()=>{
              console.log("AddedRes to base Successful!");
            }).catch((e)=>{
              console.log('RESADD_BASE SaveError: ', e);
            });  
            break;       
          }else if( resourceID.includes(ITEMS_TAG)){
            //append to correct nft
            addResourceToNFT.resources?.push(resourceObject);
            ctx.store.save(addResourceToNFT).then(()=>{
              console.log("AddedRes to Item Successful!");
            }).catch((e)=>{
              console.log(resourceID);
              console.log(resourceObject);
              console.log('RESADD_ITEM SaveError: ', e);
            }); 
            break;
          }
        }
        break;

      case RMRK_COMMAND.SETPRIORITY:
       //Append resources to NFT
       if(content1.includes(BASE_TAG) || content1.includes(ITEMS_TAG)){
         const nftPrioritySet = await getOrCreate(ctx.store, NFTS, content1);
         const priorityArray = decodeURIComponent(content2) as unknown as Array<string>;
         
         nftPrioritySet.priority = priorityArray;
        //  ctx.store.save(nftPrioritySet).then(()=>{
        //    console.log("Priority Set and saved successfully!");
        //  }).catch((e)=>{
        //    console.log(priorityArray);
        //    console.log('Priority SaveError: ', e);

        //  });
       } 
        break;

      case RMRK_COMMAND.SEND:
       //Change nft owner [assigns to parent]
        break;

      case RMRK_COMMAND.EQUIP:
        // change nft and equipabble owner
        break;

      case RMRK_COMMAND.DESTROY:
        // change owner of nft and state
        break;

      case RMRK_COMMAND.LIST:
        // change nft property
        break;
      case "CHANGEISSUER":
        //not sure what this does yet
        break;
      case "EMOTE":
        //not sure what this does yet
        break;
      case "ACCEPT":
        //not sure what this does yet
       break;
      case "EQUIPPABLE":
        //not sure what this does yet

       break;

      default:
        console.debug('No function for: ', command);
        break;
    }
  }

}


function stringifyArray(list: any[]): any[] {
  let listStr : any[] = [];
  list = list[0]
  for (let vec of list){
    for (let i = 0; i < vec.length; i++){
      vec[i] = String(vec[i]);
    }
    listStr.push(vec);
  }
  return listStr
}

type EntityConstructor<T> = {
  new (...args: any[]): T;
};

