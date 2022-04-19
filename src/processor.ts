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
import { ISSUER , RMRK_COMMAND} from "./constants";
import {
  getBaseRMRK,
  getCreateRMRK,
  getMintRMRK,
  getRessAddRMR,
  getSetPriorityRMRK,
  getSendRMRK,
  getEquipRMRK } from "./store_rmrk";
import { BaseParts, BatchAll, Collections, EquippableParts, FixedParts, NFTS } from "./model";


const processor = new SubstrateProcessor("kusama_balances");

processor.setBatchSize(500);
processor.setDataSource({
  archive: lookupArchive("kusama")[0].url,
  chain: "wss://kusama-rpc.polkadot.io",
});

processor.setBlockRange({from:12000000, to: 12400000});

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
    const batchedRemarks = getBatchAllExtrinsic(ctx); // should return an array.
    console.log(batchedRemarks);

    // const batchAll =  await getOrCreate(ctx.store, BatchAll, ctx.extrinsic.id.toString());
    // await ctx.store.save(batchAll);

  }catch(e){
    console.log("BatchAll error");
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

        if(nft.collection.endsWith("-WGLITMS")){
          //I am equippable
          console.log(nft);
          console.log('EquippableNFT');
        }
        
        if(nft.collection.endsWith("-WGL")){
          console.log('BaseNFT');
          console.log(nft);
          //I am base NFT block collection symbol sn
          const nftBaseID = `${ctx.block.height}-${nft.collection}-${nft.symbol}-${nft.sn}`;
          const nftAsset = await getOrCreate(ctx.store, NFTS, nftBaseID);
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
          nftAsset.id = nftBaseID;
          console.log(nftAsset);
          await ctx.store.save(nftAsset);

        }

        break;

      case RMRK_COMMAND.RESADD:

        break;

      case RMRK_COMMAND.SETPRIORITY:

        break;

      case RMRK_COMMAND.SEND:

        break;

      case RMRK_COMMAND.EQUIP:

        break;

      case RMRK_COMMAND.DESTROY:

        break;

      case RMRK_COMMAND.LIST:

        break;
      case "CHANGEISSUER":

        break;
      case "EMOTE":
        break;
      case "ACCEPT":
       break;
      case "EQUIPPABLE":
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

