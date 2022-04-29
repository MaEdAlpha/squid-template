"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const substrate_processor_1 = require("@subsquid/substrate-processor");
const archive_registry_1 = require("@subsquid/archive-registry");
const remarks_model_1 = require("./model/generated/remarks.model");
const base_model_1 = require("./model/generated/base.model");
const extrinsic_helpers_1 = require("./extrinsic_helpers");
const constants_1 = require("./constants");
const store_rmrk_1 = require("./store_rmrk");
const model_1 = require("./model");
const buffer_1 = require("buffer");
const processor = new substrate_processor_1.SubstrateProcessor("kusama_balances");
processor.setBatchSize(500);
processor.setDataSource({
    archive: (0, archive_registry_1.lookupArchive)("kusama")[0].url,
    chain: "wss://kusama-rpc.polkadot.io",
});
processor.setBlockRange({ from: 12452405 });
processor.addExtrinsicHandler("system.remark", processRemarks);
processor.addExtrinsicHandler("utility.batch_all", processBatchAll);
processor.run();
//remove, do not need this.
async function processRemarks(ctx) {
    try {
        const remarksData = (0, extrinsic_helpers_1.getRemarksExtrinsic)(ctx); //remark string you need to parse.
        const remark = await getOrCreate(ctx.store, remarks_model_1.Remarks, ctx.extrinsic.id.toString());
        remark.remarks = remarksData.toString();
        await ctx.store.save(remark);
        await parseRMRKData(remarksData.toString(), ctx); //send data in to save to db.
    }
    catch (e) {
        console.log(e);
    }
}
async function processBatchAll(ctx) {
    try {
        // const batchedRemarks = getBatchAllExtrinsic(ctx); // should return an array.
        // console.log(batchedRemarks);
        let ksmHackObject = ctx.extrinsic.args[0].value;
        const filteredData = ksmHackObject.filter((arg) => {
            if (arg.callIndex === '0x0001' && !arg.args.remark.toString().includes("3A3A312A302A303A3A")) { //filters out ::1.0.0::
                let hexStr = arg.args.remark.toString().slice(2);
                const buf = buffer_1.Buffer.from(hexStr, 'hex');
                const remarkString = buf.toString('utf8');
                if (remarkString.toLowerCase().includes('mun1v3rs3')) {
                    //console.log(remarkString); //DEBUG
                    return true;
                }
                return false;
            }
        });
        if (filteredData.length > 0) {
            //process remarkData.
            for (let i = 0; i < filteredData.length; i++) {
                let hexStr = filteredData[i].args.remark.toString().slice(2);
                const buf = buffer_1.Buffer.from(hexStr, 'hex');
                const remarkString = buf.toString('utf8');
                await parseRMRKData(remarkString, ctx);
            }
        }
    }
    catch (e) {
        console.log("BatchAll error: ");
        console.log(e);
    }
}
async function getOrCreate(store, EntityConstructor, id) {
    let entity = await store.get(EntityConstructor, {
        where: { id },
    });
    if (entity == null) {
        entity = new EntityConstructor();
        entity.id = id;
    }
    return entity;
}
async function parseRMRKData(rmrk, ctx) {
    //unpack
    const [name, command, ver, content1, content2, content3] = rmrk.split('::');
    if (name !== 'RMRK' || ver !== '2.0.0') {
        //skip parse, data is not relevant.
        return;
    }
    else {
        if (rmrk.includes(constants_1.BASE_TAG) || rmrk.includes(constants_1.ITEMS_TAG)) {
            console.log(rmrk);
        }
        switch (command) {
            case constants_1.RMRK_COMMAND.BASE:
                if (ctx.extrinsic.signer === constants_1.ISSUER) {
                    const baseObj = await (0, store_rmrk_1.getBaseRMRK)(content1);
                    const baseID = 'base-' + baseObj.symbol;
                    const nftBases = await getOrCreate(ctx.store, base_model_1.Base, baseID);
                    // console.log("Block height: ", ctx.block.height);
                    // console.log("Signer: ", ctx.extrinsic.signer);
                    // console.log(baseObj.parts?.forEach(part => console.log(part)));
                    // cannot do below, changes Type to Object literal, removes Entity type.
                    // nftBases = {...baseObj, id: baseID, type: 'svg'}
                    nftBases.id = baseID;
                    nftBases.block = ctx.block.height;
                    nftBases.symbol = baseObj.symbol;
                    nftBases.issuer = baseObj.issuer;
                    //not necessary, maybe keep for now when testing bugs
                    nftBases.parts = baseObj.parts?.map(part => { return part.hasOwnProperty("equippable") ? new model_1.EquippableParts(part) : new model_1.FixedParts(part); });
                    nftBases.type = "svg";
                    console.log(nftBases);
                    await ctx.store.save(nftBases);
                }
                break;
            case constants_1.RMRK_COMMAND.CREATE:
                //Collection creation
                if (ctx.extrinsic.signer === constants_1.ISSUER) {
                    const collectionObj = await (0, store_rmrk_1.getCreateRMRK)(content1);
                    if (collectionObj) {
                        const nftCollection = await getOrCreate(ctx.store, model_1.Collections, collectionObj.id);
                        nftCollection.block = ctx.block.height;
                        nftCollection.max = collectionObj.max;
                        nftCollection.issuer = collectionObj.issuer;
                        nftCollection.metadata = collectionObj.metadata;
                        nftCollection.id = collectionObj.id;
                        nftCollection.changes = collectionObj.changes ? collectionObj.changes : [];
                        nftCollection.symbol = collectionObj.symbol;
                        console.log(`wrote Collection: ${nftCollection.id}`);
                        await ctx.store.save(nftCollection);
                    }
                }
                break;
            case constants_1.RMRK_COMMAND.MINT:
                //Mint multiple cases now
                if (rmrk.includes(constants_1.ITEMS_TAG)) {
                    const nft = JSON.parse(decodeURIComponent(content1));
                    const childNFT = nft.collection.includes(constants_1.COLLECTION_ITEM_TAG);
                    if (childNFT) { //change collection to MUN1V3RS31TMS
                        //I am equippable  
                        const nftRecordID = `${ctx.block.height}-${nft.collection}-${nft.symbol}-${nft.sn}`;
                        const nftAsset = await getOrCreate(ctx.store, model_1.NFTS, nftRecordID);
                        const equipEntity = await getOrCreate(ctx.store, model_1.Properties, nftRecordID);
                        equipEntity.royaltyInfo = JSON.stringify(nft.properties?.royaltyInfo);
                        equipEntity.itemAttributes = JSON.stringify(nft.properties.itemAttributes);
                        equipEntity.id = nftRecordID;
                        equipEntity.rootowner = constants_1.ISSUER;
                        await ctx.store.save(equipEntity).then((result) => {
                            console.log('saving equipEntity');
                            console.log(result);
                        }).catch((e) => {
                            console.log(e);
                        });
                        nftAsset.block = ctx.block.height;
                        nftAsset.collection = nft.collection;
                        nftAsset.symbol = nft.symbol;
                        nftAsset.transferable = nft.transferable;
                        nftAsset.sn = nft.sn;
                        nftAsset.metadata = nft.metadata;
                        nftAsset.owner = constants_1.ISSUER;
                        nftAsset.rootowner = constants_1.ISSUER;
                        nftAsset.forsale = "addIntoMintingCode";
                        nftAsset.burned = "0";
                        nftAsset.priority = [];
                        nftAsset.pending = false;
                        nftAsset.id = nftRecordID;
                        nftAsset.changes = [];
                        nftAsset.children = [];
                        await ctx.store.save(nftAsset).then(() => {
                            console.log("childNFT save Successful!");
                            console.log(nftAsset);
                        }).catch((e) => {
                            console.log('NFT SaveError: ', e);
                            console.log(nftRecordID);
                        });
                    }
                }
                else if (rmrk.includes(constants_1.BASE_TAG)) {
                    const nft = JSON.parse(decodeURIComponent(content1)); //can set your own type for this.
                    const parentNFT = nft.collection.includes(constants_1.COLLECTION_BASE_TAG);
                    if (parentNFT) { //change collection to MUN1V3RS31TMS
                        const nftRecordID = `${ctx.block.height}-${nft.collection}-${nft.symbol}-${nft.sn}`;
                        const nftAsset = await getOrCreate(ctx.store, model_1.NFTS, nftRecordID);
                        const baseEntity = await getOrCreate(ctx.store, model_1.Properties, nftRecordID);
                        baseEntity.royaltyInfo = JSON.stringify(nft.properties.royaltyInfo);
                        baseEntity.baseAttributes = JSON.stringify(nft.properties?.baseAttributes);
                        baseEntity.itemAttributes = JSON.stringify(nft.properties?.itemAttributes);
                        baseEntity.id = nftRecordID;
                        baseEntity.rootowner = constants_1.ISSUER;
                        await ctx.store.save(baseEntity).then((result) => {
                            console.log('[SUCCESS] BASE ENTITY');
                            console.log(baseEntity);
                        }).catch((e) => {
                            console.log("[ERROR] BASE ENTITY");
                            console.log(e);
                        });
                        nftAsset.block = ctx.block.height;
                        nftAsset.collection = nft.collection;
                        nftAsset.symbol = nft.symbol;
                        nftAsset.transferable = nft.transferable;
                        nftAsset.sn = nft.sn;
                        nftAsset.metadata = nft.metadata;
                        nftAsset.owner = constants_1.ISSUER;
                        nftAsset.rootowner = constants_1.ISSUER;
                        nftAsset.forsale = "addIntoMintingCode";
                        nftAsset.burned = "0";
                        nftAsset.priority = [];
                        nftAsset.pending = false;
                        nftAsset.id = nftRecordID;
                        nftAsset.changes = [];
                        nftAsset.children = [];
                        console.log(nftAsset);
                        console.log("About to fail 1");
                        await createParentResource(nftRecordID, nft.sn, nft.metadata, nft.collection, ctx);
                        console.log(("About to fail 2"));
                        await ctx.store.save(nftAsset).then(() => {
                            console.log("[SUCCESS] baseNFT save Successful!");
                            console.log(content1);
                        }).catch((e) => {
                            console.log('[ERROR]: baseNFT ', e);
                            // console.log(baseProperty);  
                        });
                    }
                }
                else {
                    break;
                }
                break;
            case constants_1.RMRK_COMMAND.RESADD:
                if (content2) {
                    const resource = rmrk.includes("MUN1V3RS3-ITMS") ?
                        await (0, store_rmrk_1.NFTChildResourcesAddRMRK)(content2)
                        :
                            rmrk.includes("MUN1V3RS3-MNSTR") ?
                                await (0, store_rmrk_1.NFTParentResourcesAddRMRK)(content2)
                                :
                                    undefined;
                    if (resource === undefined) {
                        break;
                    }
                    const resourceID = content1;
                    if (resourceID.includes(constants_1.BASE_TAG) || resourceID.includes(constants_1.ITEMS_TAG)) {
                        if (resourceID.includes(constants_1.BASE_TAG)) {
                            console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
                            console.log("RESOURCE ADDED FOR BASE NFT!?!!!!!!");
                            break;
                        }
                        else if (resourceID.includes(constants_1.ITEMS_TAG)) {
                            //append to correct nft
                            const addResourceToNFT = await getOrCreate(ctx.store, model_1.NFTResource, resourceID);
                            const childRes = new model_1.NFTChildResource(resource);
                            childRes.pending = false;
                            const newArray = addResourceToNFT.resources !== undefined ? [addResourceToNFT.resources.flat(), childRes] : [childRes];
                            // newArray.forEach(item=> console.log(`Resource Print: ${item}`));
                            addResourceToNFT.resources = newArray.flat();
                            addResourceToNFT.priority = [];
                            addResourceToNFT.rootowner = constants_1.ISSUER;
                            console.log('-------Resource to add--------');
                            console.log(resourceID);
                            console.log(resource);
                            console.log("--------Updated ITEM resource---------");
                            console.log(addResourceToNFT);
                            console.log("--------------------------------");
                            // const updatedArray: NFTChildResource[] = (addResourceToNFT.resources);
                            // updatedArray
                            await ctx.store.save(addResourceToNFT).then(() => {
                                // console.log(`AddedRes to item: ${resourceID} Successful!`);
                            }).catch((e) => {
                                console.log(`Item: ${resourceID} SaveError: `, e);
                                console.log();
                            });
                            break;
                        }
                    }
                }
                break;
            case constants_1.RMRK_COMMAND.SETPRIORITY:
                //Append resources to NFT
                if (content1.includes(constants_1.ITEMS_TAG) || content1.includes(constants_1.BASE_TAG)) {
                    //  console.log(content1);
                    //  console.log(content2);
                    const addPriorityToResource = await getOrCreate(ctx.store, model_1.NFTResource, content1);
                    let priorityArray = JSON.parse(decodeURIComponent(content2));
                    addPriorityToResource.priority = priorityArray;
                    if (content1.includes(constants_1.BASE_TAG)) {
                        const nftBase = await getOrCreate(ctx.store, model_1.NFTS, content1);
                        nftBase.priority = priorityArray;
                        await ctx.store.save(nftBase).then(() => {
                            console.log("BASE PRIORITY SET~~~~~~~~~~~~~~~~~~");
                        });
                    }
                    // console.log(addPriorityToResource);
                    //  const priorityArray = decodeURIComponent(content2) as unknown as Array<string>;
                    //  nftPrioritySet.priority = priorityArray;
                    await ctx.store.save(addPriorityToResource).then(() => {
                        //  console.log("Priority Set and saved successfully!");
                    }).catch((e) => {
                        console.log(priorityArray);
                        console.log('Priority SaveError: ', e);
                    });
                }
                break;
            case constants_1.RMRK_COMMAND.SEND:
                //Change nft owner [assigns to parent]
                //two scenarios, 
                //1)send to new Owner
                // SEND is used to append childNFT to parentNFT. 
                const signerAddr = ctx.extrinsic.signer;
                if (content1.includes(constants_1.COLLECTION_ITEM_TAG) && content2.includes(constants_1.COLLECTION_BASE_TAG)) {
                    //Sending an item to parent. assign ownership to parent. update changelog
                    //content1 = child item id
                    //content2 = parent item id
                    console.log(`${content1} SEND -> ${content2}`);
                    const childNft = await getOrCreate(ctx.store, model_1.NFTS, content1);
                    const changeLog = new model_1.ChangeLog({ old: ctx.extrinsic.signer, new: content2 });
                    // changes allow for unequipping items back to parent
                    childNft.changes = [changeLog];
                    await ctx.store.save(childNft).then(() => {
                        console.log("[UPDATED OWNERSHIP CHANGE LOG] Item -> Parent. Set rootownership of item...");
                    }).catch((e) => {
                        console.log('[CHANGE_LOG_ERR]', e);
                    });
                    await setItemOwnership(content1, content2, ctx, true); //true means parentIsOwner scenario.
                }
                else if ((content1.includes(constants_1.COLLECTION_BASE_TAG)) && (!content2.includes(constants_1.COLLECTION_ITEM_TAG) && !content2.includes(constants_1.COLLECTION_BASE_TAG)) && content2) {
                    //User sends nested NFT you change owner of both base and children
                    //get NFTS with content1 address 
                    const nftBase = await getOrCreate(ctx.store, model_1.NFTS, content1);
                    const newOwner = content2;
                    await setPropertyRootOwner(ctx, content1, newOwner);
                    await setResourceRootOwner(ctx, content1, newOwner);
                    nftBase.owner = newOwner; // set only for parent. childNfts.owner could be parentNfts
                    nftBase.rootowner = newOwner; //actual EOA of nft ownership
                    await ctx.store.save(nftBase).then(() => {
                        console.log(`Send ${content1} to ${newOwner} successful`);
                    }).catch((e) => {
                        console.log('Send ERROR: ', e);
                    });
                    for await (const childResource of nftBase.children) {
                        console.log(`Sending ${childResource.id} to ${newOwner} `);
                        await setItemRootOwnershipOnly(childResource.id, newOwner, ctx);
                        await setPropertyRootOwner(ctx, childResource.id, newOwner);
                        await setResourceRootOwner(ctx, childResource.id, newOwner);
                    }
                    //get ownerString and validate with validateSigner() if true, then set the NFTs OWNER AND ROOTOWNER address 
                }
                else if (content1.includes(constants_1.COLLECTION_ITEM_TAG) && !content2.includes(constants_1.COLLECTION_BASE_TAG) && content2) {
                    //User sends nested NFT you change owner of both base and children
                    //get NFTS with content1 address 
                    const nftItem = await getOrCreate(ctx.store, model_1.NFTS, content1);
                    const newOwner = content2;
                    await setPropertyRootOwner(ctx, content1, newOwner);
                    await setResourceRootOwner(ctx, content1, newOwner);
                    const possibleParentNftID = nftItem.changes[0].new;
                    if (possibleParentNftID.includes(constants_1.BASE_TAG)) {
                        await removeItemFromParent(possibleParentNftID, content1, ctx);
                    }
                    nftItem.owner = newOwner; // Should no longer be owned by parent, user can send item while still nested. change owner to newOwner.
                    nftItem.rootowner = newOwner; //actual EOA of nft ownership
                    nftItem.changes[0].old = newOwner;
                    nftItem.changes[0].new = newOwner;
                    await ctx.store.save(nftItem).then(() => {
                        console.log(`Send ${content1} to ${newOwner} successful`);
                    }).catch((e) => {
                        console.log('Send ERROR: ', e);
                    });
                }
                break;
            case constants_1.RMRK_COMMAND.EQUIP:
                if (content1.includes(constants_1.ITEMS_TAG) && content2 === '') {
                    //Unequip item to EOA.
                    console.log(`UNEQUIP ${content1} back to: `, ctx.extrinsic.signer);
                    await setItemOwnership(content1, ctx.extrinsic.signer, ctx, false);
                    //Remove from children[] of parentNFT
                    const nftChild = await getOrCreate(ctx.store, model_1.NFTS, content1);
                    let oldOwner = nftChild.changes[0].old; // owner's address
                    let newOwner = nftChild.changes[0].new; //saved parentNFT address
                    const nftParent = await getOrCreate(ctx.store, model_1.NFTS, newOwner);
                    const nftParentChildren = nftParent.children;
                    const newFilteredArray = nftParentChildren.filter((child) => {
                        return child.id !== content1;
                    });
                    nftParent.children = [...newFilteredArray];
                    console.log(`ParentNFT lookup new: ${newOwner} old: ${oldOwner}`);
                    await ctx.store.save(nftParent).then(() => {
                        console.log("[SUCCESS] item removed, new array.");
                        console.log(newFilteredArray);
                        console.log(`${content1} vs ${nftParent.children}`);
                    }).catch((e) => {
                        console.log("ERR removing child");
                        console.log(newFilteredArray);
                    });
                    // filter array to exclude content1
                    // save new parentNFT children[]
                    // store in db
                }
                if (content1.includes(constants_1.ITEMS_TAG) && content2.includes(constants_1.COLLECTION_BASE_TAG)) {
                    //Assign item to parentNFT children[]
                    let item = await getItemResource(content1, ctx);
                    const nftChild = await getOrCreate(ctx.store, model_1.NFTS, content1);
                    let changeLog = nftChild.changes;
                    let parentID = changeLog[0]?.new;
                    // console.log('xxxXXXxitemResourcexxxXXx')
                    // console.log(item.resource);
                    // console.log('xxxxxxNFTCHILD...Check')
                    // console.log(nftChild);
                    //add item resource to parent.children[itemResources]
                    const nftParent = await getOrCreate(ctx.store, model_1.NFTS, parentID); //get parent for children[]
                    const newArray = nftParent.children !== [] ? [...nftParent.children, item.resource] : [item.resource];
                    nftParent.children = newArray;
                    console.log("NFT PARENT CHILDREN ARRAY");
                    console.log(nftParent.children);
                    // console.log('NEW ARRAY');
                    // console.log(newArray);
                    await setItemOwnership(content1, nftParent.id, ctx, true);
                    await ctx.store.save(nftParent).then(() => {
                        console.log('[SUCCESS] Child added to ParentNFT!');
                    }).catch((e) => {
                        console.log("[FAIL] Child not added to ParnetNFT", e);
                    });
                }
                break;
            case constants_1.RMRK_COMMAND.DESTROY:
                if (content1.includes(constants_1.BASE_TAG) || content1.includes(constants_1.ITEMS_TAG)) {
                    console.log('DESTROY => ', rmrk);
                    //TODO  DESTROY items and delist owner
                }
                break;
            case constants_1.RMRK_COMMAND.LIST:
                // change nft property
                break;
            case constants_1.RMRK_COMMAND.BUY:
                // change nft property
                // assign owner to NFT. Along with all Children items. 
                if (content1.includes(constants_1.BASE_TAG)) {
                    const nftBase = await getOrCreate(ctx.store, model_1.NFTS, content1);
                    nftBase.owner = ctx.extrinsic.signer;
                    nftBase.rootowner = ctx.extrinsic.signer;
                    await ctx.store.save(nftBase).then(() => {
                        console.log("New Owner for base!");
                    });
                    await setPropertyRootOwner(ctx, content1, ctx.extrinsic.signer);
                    await setResourceRootOwner(ctx, content1, ctx.extrinsic.signer);
                    //TODO map undefined error handle.
                    if (nftBase.children.length > 0) {
                        for await (const childResource of nftBase.children) {
                            await setItemRootOwnershipOnly(childResource.id, ctx.extrinsic.signer, ctx);
                            await setPropertyRootOwner(ctx, childResource.id, ctx.extrinsic.signer);
                            await setResourceRootOwner(ctx, childResource.id, ctx.extrinsic.signer);
                        }
                        ;
                    }
                }
                else if (content1.includes(constants_1.ITEMS_TAG)) {
                    const nftItem = await getOrCreate(ctx.store, model_1.NFTS, content1);
                    nftItem.owner = ctx.extrinsic.signer;
                    nftItem.rootowner = ctx.extrinsic.signer;
                    await ctx.store.save(nftItem).then(() => {
                        console.log("New Owner for Item saved!");
                    });
                    const possibleParentNftID = nftItem.changes[0].new;
                    if (possibleParentNftID.includes(constants_1.BASE_TAG)) {
                        await removeItemFromParent(possibleParentNftID, content1, ctx);
                    }
                    await setPropertyRootOwner(ctx, content1, ctx.extrinsic.signer);
                    await setResourceRootOwner(ctx, content1, ctx.extrinsic.signer);
                }
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
            case "BURN":
                if (content1.includes(constants_1.BASE_TAG) || content1.includes(constants_1.ITEMS_TAG)) {
                    console.log('BURN => ', rmrk);
                    //TODO  BURN items and delist owner
                }
                break;
            default:
                console.debug('No function for: ', command);
                break;
        }
    }
}
async function setItemRootOwnershipOnly(content1, newOwner, ctx) {
    //sets item ownership, also adds priority to NFT object (messy due to my noobness of TypeORM)
    const nftItem = await getOrCreate(ctx.store, model_1.NFTS, content1);
    nftItem.rootowner = newOwner;
    nftItem.changes[0].old = newOwner;
    const nftResource = await getOrCreate(ctx.store, model_1.NFTResource, content1); //get item resource
    if (nftResource.priority[0] != undefined) {
        nftItem.priority = [nftResource.priority[0], nftResource.priority[1]];
    }
    await ctx.store.save(nftItem).then(() => {
        console.log('[ONLY_ROOTOWNERSHIP_TRNSFR_SUCCESS]!');
    }).catch((e) => {
        console.log('[OWNERSHIP_TRNSFR_FAIL]!');
        console.log(e);
        console.log(`Item ${content1} to newOwner:  ${newOwner} send fail`);
        console.log(`Extrinsic signer: ${ctx.extrinsic.signer} : item Rootowner: ${nftItem.rootowner}`);
    });
}
async function setItemOwnership(content1, newOwner, ctx, parentNFTisOwner) {
    //sets item ownership, also adds priority to NFT object (messy due to my noobness of TypeORM)
    const nftItem = await getOrCreate(ctx.store, model_1.NFTS, content1);
    console.log(`[ROOT_OWNER_SET_INIT]`);
    if (parentNFTisOwner) {
        let parentRef = nftItem.changes;
        nftItem.owner = parentRef[0].new;
        nftItem.rootowner = ctx.extrinsic.signer;
        console.log(`[PARENTisOWNER SET:] ${content1} owner = ${parentRef[0].new} \n root owner: ${newOwner}`);
        const nftResource = await getOrCreate(ctx.store, model_1.NFTResource, content1); //get item resource
        if (nftResource.priority[0] != undefined) {
            nftItem.priority = [nftResource.priority[0], nftResource.priority[1]];
        }
        await ctx.store.save(nftItem).then(() => {
            console.log('[OWNERSHIP_TRNSFR_SUCCESS]!');
        }).catch((e) => {
            console.log('[OWNERSHIP_TRNSFR_FAIL]!');
            console.log(e);
            console.log(`Item ${content1} to newOwner:  ${newOwner} send fail`);
            console.log(`Extrinsic signer: ${ctx.extrinsic.signer} : item Rootowner: ${nftItem.rootowner}`);
        });
    }
    else {
        nftItem.owner = newOwner;
        nftItem.rootowner = newOwner;
        // const nftResource = await getOrCreate(ctx.store, NFTResource, content1); //get item resource
        // if(nftResource.priority[0] != undefined){
        //   nftItem.priority=[nftResource.priority[0],nftResource.priority[1]];
        // }
        console.log(`[BUY/GIFT OWNER SET:] ${content1} owner = ${newOwner} \n root owner: ${newOwner}`);
        await ctx.store.save(nftItem).then(() => {
            console.log('[OWNER_TRNSFR_SUCCESS]!');
        }).catch((e) => {
            console.log('[OWNERSHIP_TRNSFR_FAIL]!');
            console.log(e);
            console.log(`Item ${content1} to newOwner:  ${newOwner} send fail`);
            console.log(`Extrinsic signer: ${ctx.extrinsic.signer} : item Rootowner: ${nftItem.rootowner}`);
        });
    }
}
async function getItemResource(itemId, ctx) {
    //this snippet returns a resource.
    console.log('Retrieving Item: ', itemId);
    const nftResource = await getOrCreate(ctx.store, model_1.NFTResource, itemId);
    console.log(nftResource);
    const nftResourceArr = nftResource.resources;
    console.log(nftResourceArr);
    let mainPriority = nftResource.priority[0];
    console.log(mainPriority);
    let slot = nftResourceArr.find(({ id }) => id === mainPriority).slot;
    const resource = new model_1.NFTChildren({
        id: itemId,
        pending: false,
        equipped: slot
    });
    const result = {
        resource: resource,
        priority: nftResource.priority
    };
    return result;
}
async function setItemResource(itemId, ctx) {
    const nftResource = await getOrCreate(ctx.store, model_1.NFTResource, itemId);
}
async function setPropertyRootOwner(ctx, id, newRootOwner) {
    const baseProperties = await getOrCreate(ctx.store, model_1.Properties, id);
    baseProperties.rootowner = newRootOwner;
    await ctx.store.save(baseProperties).then(() => {
        console.log(`[SUCCESS]: Property_ROOTOWNER_CHANGE ${id}`);
    }).catch((e) => {
        console.log('Property update error: ', e);
    });
}
async function setResourceRootOwner(ctx, id, newRootOwner) {
    const nftResource = await getOrCreate(ctx.store, model_1.NFTResource, id);
    nftResource.rootowner = newRootOwner;
    await ctx.store.save(nftResource).then(() => {
        console.log(`[SUCCESS]: Resource_ROOTOWNER_CHANGE ${id}`);
    }).catch((e) => {
        console.log('Resource update error: ', e);
        console.log(nftResource);
        console.log(id);
        console.log(newRootOwner);
    });
}
async function createParentResource(resourceID, sn, metadata, symbol, ctx) {
    //need to dynamically find base resources.
    const addResourceToNFT = await getOrCreate(ctx.store, model_1.NFTResource, resourceID);
    //IMPORRTANT COLLECTION BASE TAG should also be what BASE records store as ID wise.
    const baseID = 'base' + symbol.slice(18);
    const baseData = await getOrCreate(ctx.store, base_model_1.Base, baseID);
    const partsArray = baseData.parts;
    console.log(baseData);
    //Creates a new array of parts to append to parentNFT. Needs to be of 8 variations.
    const resourceArray = partsArray.map((part) => {
        if ((+sn % 8) !== 0 && part.id.includes((+sn % 8).toString())) {
            return part.id;
        }
        if ((+sn % 8) === 0 && part.id.includes('8')) { //CHANGE
            return part.id;
        }
        if (part.isTypeOf === 'EquippableParts') {
            return part.id;
        }
    }).filter((el) => el !== undefined);
    console.log(resourceArray);
    let resource = {
        pending: false,
        id: resourceID,
        base: baseID,
        parts: resourceArray,
        thumb: metadata
    };
    const parentResource = new model_1.NFTParentResources(resource);
    let uniqueId = Math.random().toString(36).slice(2);
    addResourceToNFT.priority = [uniqueId];
    addResourceToNFT.rootowner = constants_1.ISSUER;
    addResourceToNFT.resources = [parentResource];
    await ctx.store.save(addResourceToNFT).then(() => {
        console.log(`[SUCCESS_PARENT_RESOURCE] `);
        console.log(addResourceToNFT);
    }).catch((e) => {
        console.log(`BASE ${resourceID} SaveError: `, e);
        console.log(addResourceToNFT);
    });
}
async function removeItemFromParent(parentID, itemID, ctx) {
    const parentNFT = await getOrCreate(ctx.store, model_1.NFTS, parentID);
    const filteredChildren = parentNFT.children.filter((child) => { return child.id !== itemID; });
    parentNFT.children = filteredChildren;
    await ctx.store.save(parentNFT).then(() => {
        console.log(`[FILTERED_ITEM_SUCCESS]: ${itemID} removed from parentNFT`);
    }).catch((e) => {
        console.log(`[FILTERED_ITEM_FAIL]: `, e);
    });
}
function validateSigner(rootOwner, signerAddr) {
    return signerAddr === rootOwner;
}
function stringifyArray(list) {
    let listStr = [];
    list = list[0];
    for (let vec of list) {
        for (let i = 0; i < vec.length; i++) {
            vec[i] = String(vec[i]);
        }
        listStr.push(vec);
    }
    return listStr;
}
//# sourceMappingURL=processor.js.map