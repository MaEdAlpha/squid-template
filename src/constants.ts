export const ISSUER = "DUo6kCiz2z2jAkyDtRMDR6ZfZPuG2HS12q8fL73BNi1neVt";

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
    CREATE = "CREATE",
    BUY = "BUY",
    LOCK = "LOCK",
};

export const ITEMS_TAG = "-MUN1V3RS3-ITMS-"; //used to find parse nft_bases from nft_items
export const BASE_TAG = "-MUN1V3RS3-MNSTR-"; //used to find parse nft_bases from nft_items

export const COLLECTION_ITEM_TAG = "-MUN1V3RS3-ITMS-";
export const COLLECTION_BASE_TAG = "-MUN1V3RS3-MNSTR-"; //need to create MU-WGL

/*

hex filter keys:

::1.0.0::   = 3A3A312A302A303A3A

-WGL        = 2D57474C // remember! lowercase is differnt 

*/