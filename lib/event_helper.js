"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// export function getRemarkedHash(ctx: EventHandlerContext): RemarkedObject {
//     //Continue here
//     const remarkedEvent = new SystemRemarkedEvent(ctx);
//     //Check version, then do something. Currently asV2030[uint8array, uint8array]/asV9160 isLatest == v9160[accountid32, v9160.h256].
//     if(remarkedEvent.isV2030){
//         return { accountInfo: "v2030-" + remarkedEvent.asV2030[0].toString() , remarkHash: remarkedEvent.asV2030[1].toString() }
//     }
//     if(remarkedEvent.isV9160){
//         return { accountInfo: remarkedEvent.asV9160.sender.toString(), remarkHash: remarkedEvent.asV9160.hash.toString() } 
//     }
//     throw new Error("No runtime version found! 0_0");
// }
//# sourceMappingURL=event_helper.js.map