"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.COLLECTION_BASE_TAG = exports.COLLECTION_ITEM_TAG = exports.BASE_TAG = exports.ITEMS_TAG = exports.RMRK_COMMAND = exports.ISSUER = void 0;
exports.ISSUER = "DUo6kCiz2z2jAkyDtRMDR6ZfZPuG2HS12q8fL73BNi1neVt";
var RMRK_COMMAND;
(function (RMRK_COMMAND) {
    RMRK_COMMAND["MINT"] = "MINT";
    RMRK_COMMAND["SEND"] = "SEND";
    RMRK_COMMAND["LIST"] = "LIST";
    RMRK_COMMAND["ACCEPT"] = "ACCEPT";
    RMRK_COMMAND["EQUIP"] = "EQUIP";
    RMRK_COMMAND["RESADD"] = "RESADD";
    RMRK_COMMAND["DESTROY"] = "DESTROY";
    RMRK_COMMAND["SETPRIORITY"] = "SETPRIORITY";
    RMRK_COMMAND["BASE"] = "BASE";
    RMRK_COMMAND["CREATE"] = "CREATE";
    RMRK_COMMAND["BUY"] = "BUY";
    RMRK_COMMAND["LOCK"] = "LOCK";
})(RMRK_COMMAND = exports.RMRK_COMMAND || (exports.RMRK_COMMAND = {}));
;
exports.ITEMS_TAG = "-MUN1V3RS3-ITMS-"; //used to find parse nft_bases from nft_items
exports.BASE_TAG = "-MUN1V3RS3-MNSTR-"; //used to find parse nft_bases from nft_items
exports.COLLECTION_ITEM_TAG = "-MUN1V3RS3-ITMS-";
exports.COLLECTION_BASE_TAG = "-MUN1V3RS3-MNSTR-"; //need to create MU-WGL
/*

hex filter keys:

::1.0.0::   = 3A3A312A302A303A3A

-WGL        = 2D57474C // remember! lowercase is differnt

*/ 
//# sourceMappingURL=constants.js.map