"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEquipRMRK = exports.getSendRMRK = exports.getSetPriorityRMRK = exports.NFTChildResourcesAddRMRK = exports.NFTParentResourcesAddRMRK = exports.getMintNFTRMRK = exports.getCreateRMRK = exports.getBaseRMRK = void 0;
const model_1 = require("./model");
async function getBaseRMRK(data) {
    //convert string into json data then assign create Base instance, verify mint address === issuer.
    const jsonData = getJSON(data);
    return new model_1.Base(jsonData);
}
exports.getBaseRMRK = getBaseRMRK;
async function getCreateRMRK(data) {
    const jsonData = getJSON(data);
    return jsonData;
}
exports.getCreateRMRK = getCreateRMRK;
async function getMintNFTRMRK(data) {
    const jsonData = getJSON(data);
    return jsonData;
}
exports.getMintNFTRMRK = getMintNFTRMRK;
async function NFTParentResourcesAddRMRK(data) {
    const jsonData = getJSON(data);
    return jsonData;
}
exports.NFTParentResourcesAddRMRK = NFTParentResourcesAddRMRK;
async function NFTChildResourcesAddRMRK(data) {
    const jsonData = getJSON(data);
    return jsonData;
}
exports.NFTChildResourcesAddRMRK = NFTChildResourcesAddRMRK;
async function getSetPriorityRMRK(data) {
    return true;
}
exports.getSetPriorityRMRK = getSetPriorityRMRK;
async function getSendRMRK(data) {
    return true;
}
exports.getSendRMRK = getSendRMRK;
async function getEquipRMRK(data) {
    return true;
}
exports.getEquipRMRK = getEquipRMRK;
// export async function getRMRK(data:string, opType:string): Promise<Collections | NFTS | Base | undefined>{
//     let jsonData;
//     switch(opType){
//         case 'BASE':
//             jsonData = await getJSON(data) as Base;
//             break;
//         case 'CREATE':
//             jsonData = await getJSON(data) as Collections;
//             break;
//         case 'NFTS':
//             jsonData = await getJSON(data) as NFTS;
//             break;
//         default:
//             console.debug('Did not register opType')
//             break;
//     }
//     return jsonData;
// }
function getJSON(str) {
    return JSON.parse(decodeURIComponent(str));
}
//# sourceMappingURL=store_rmrk.js.map