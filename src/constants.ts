export const ISSUER = "FX1HWrb7DbVerJPCSdDMJwSh6eDpMMax7EH5pumDdtqaDQi";

export enum RMRK_COMMAND  {
    MINT ="MINT",
    SEND = "SEND",
    LIST = "LIST",
    ACCEPT = "ACCEPT",
    EQUIP = "EQUIP",
    RESADD = "RESADD",
    DESTROY = "DESTROY",
    SETPRIORITY = "SETPRIORITY",
    BASE = "BASE",
    CREATE = "CREATE"
};

export const ITEMS_TAG = "-WGLITMS-"; //used to find parse nft_bases from nft_items
export const BASE_TAG = "-WGL-"; //used to find parse nft_bases from nft_items

export const COLLECTION_ITEM_TAG = "-WGLITMS";
export const COLLECTION_BASE_TAG = "-WGL";

/*

hex filter keys:

::1.0.0::   = 3A3A312A302A303A3A

-WGL        = 2D57474C // remember! lowercase is differnt 

*/