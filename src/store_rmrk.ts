
import { Collections, Base, NFTS, Properties, NFTParentResources, NFTChildResource } from './model';

export async function getBaseRMRK(data: string){
    //convert string into json data then assign create Base instance, verify mint address === issuer.
    const jsonData: Partial<Base> =  getJSON(data);
    return new Base(jsonData);

}

export async function getCreateRMRK(data:string): Promise<Collections>{
    const jsonData: Collections = getJSON(data);
    return jsonData;
}

export async function getMintNFTRMRK(data:string): Promise<NFTS>{
    const jsonData: NFTS = getJSON(data);
    return jsonData;
}


export async function NFTParentResourcesAddRMRK(data:string): Promise<NFTParentResources>{
    const jsonData: NFTParentResources = getJSON(data);
    return jsonData;
}

export async function NFTChildResourcesAddRMRK(data:string): Promise<NFTChildResource>{
    const jsonData: NFTChildResource = getJSON(data);
    return jsonData;
}

export async function getSetPriorityRMRK(data:string): Promise<boolean>{
    return true;
}

export async function getSendRMRK(data:string): Promise<boolean>{
    return true;
}

export async function getEquipRMRK(data:string): Promise<boolean>{
    return true;
}

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

function getJSON(str:string){
    return JSON.parse(decodeURIComponent(str));
}

