import { EventHandlerContext, ExtrinsicHandlerContext,  } from "@subsquid/substrate-processor";
import { SystemRemarkCall, UtilityBatchAllCall } from "./types/calls";
import { SystemCall_remark, Type_179 } from "./types/v2026";
import { Type_184 } from "./types/v2028";
import { Type_184 as Type_184_29 } from "./types/v2029";
import { Type_123 } from "./types/v9040";
import { Type_123 as Type_123_30 } from "./types/v2030";
import { Type_123 as Type_123_9010 } from "./types/v9010";
import { Type_123 as Type_123_9040 } from "./types/v9040";
import { Type_124 as Type_124_9050 } from "./types/v9050";
import { Type_125 } from "./types/v9080";
import  { Type_125 as Type_125_9090 } from "./types/v9090";
import  { Type_125 as Type_125_9100 } from "./types/v9100";
import { Call } from "./types/v9111";
import { Call as Call_22 } from "./types/v9122";
import { Call as Call_30 } from "./types/v9130";
import { Call as Call_60 } from "./types/v9160";
import { Call as Call_70 } from "./types/v9170";
import { Call as Call_80 } from "./types/v9180";


export function getRemarksExtrinsic(ctx: ExtrinsicHandlerContext): Uint8Array {
    if(!ctx.extrinsic){
        throw new MissingExtrinsicError("missing extrinsic information");
    }
    
    let ex_ctx: ExtrinsicHandlerContext = ctx as ExtrinsicHandlerContext;

    const extrinsic = new SystemRemarkCall(ex_ctx);

    if(extrinsic.isV1020) {
        const {remark } = extrinsic.asV1020 ;
        return remark;
    }
    throw new Error("No Runtime Version Found for Extrinsic");
}

// (
//     Type_179[] | 
//     Type_184[] |
//     Type_184_29[] |
//     Type_123[] |
//     Type_123_30[] |
//     Type_123_9010[] |
//     Type_123_9040[] |
//     Type_124_9050[] |
//     Type_125[] |
//     Type_125_9090[] |
//     Type_125_9090[] |
//     Type_125_9100[] |
//     Call[] |
//     Call_22[] |
//     Call_30[] |
//     Call_60[] |
//     Call_70[] |
//     Call_80[]    
//     ) 


export function getBatchAllExtrinsic(ctx: ExtrinsicHandlerContext)
: String{
    if(!ctx.extrinsic){
        throw new MissingExtrinsicError("missing extrinsic information");
    }
    
    let ex_ctx: ExtrinsicHandlerContext = ctx as ExtrinsicHandlerContext;

    const extrinsic = new UtilityBatchAllCall(ex_ctx);
    let remarkArray;
    if(extrinsic.isV2026) {
        if(true){
            remarkArray = extrinsic.asV2026.calls.toString();
            return remarkArray;
        }
    }
    if(extrinsic.isV2028) {
        if(true){
            remarkArray = extrinsic.asV2028.calls.toString();
            return remarkArray;
        }
    }

    if(extrinsic.isV2029) {
        if(true){
            remarkArray = extrinsic.asV2029.calls.toString();
            return remarkArray;
        }
    }
    if(extrinsic.isV2030){

        if(true){
            remarkArray = extrinsic.asV2030.calls.toString();
            return remarkArray;
        }
    }
    if(extrinsic.isV9010){
        
        if(true){
            remarkArray = extrinsic.asV9010.calls.toString();
            return remarkArray;
        }
    }
    if(extrinsic.isV9040){

        if(true){
            remarkArray = extrinsic.asV9040.calls.toString();
            return remarkArray;
        }
    }
    if(extrinsic.isV9050){

        if(true){
            remarkArray = extrinsic.asV9050.calls.toString();
            return remarkArray;
        }
    }
    if(extrinsic.isV9080){

        if(true){
            remarkArray = extrinsic.asV9080.calls.toString();
            return remarkArray;
        }
    }
    if(extrinsic.isV9090){

        if(true){
            remarkArray = extrinsic.asV9090.calls.toString();
            return remarkArray;
        }
    }
    if(extrinsic.isV9100){

        if(true){
            remarkArray = extrinsic.asV9100.calls.toString();
            return remarkArray;
        }
    }   
    if(extrinsic.isV9111){

        if(true){
            remarkArray = extrinsic.asV9111.calls.toString();
            return remarkArray;
        }
    }
    if(extrinsic.isV9122){

        if(true){
            remarkArray = extrinsic.asV9122.calls.toString();
            return remarkArray;
        }
    }
    if(extrinsic.isV9130){

        if(true){
            remarkArray = extrinsic.asV9130.calls.toString();
            return remarkArray;
        }
    }
    if(extrinsic.isV9160){

        if(true){
            remarkArray = extrinsic.asV9160.calls.toString();
            return remarkArray;
        }
    }
    if(extrinsic.isV9170){

        if(true){
            remarkArray = extrinsic.asV9170.calls.toString();
            return remarkArray;
        }
    }
    if(extrinsic.isV9180){

        if(true){
            remarkArray = extrinsic.asV9180.calls.toString();
            return remarkArray;
        }
    }
    throw new Error("No Runtime Version Found for Extrinsic");
}


export class MissingExtrinsicError extends Error {
    constructor(m:string) {
        super(m);

        Object.setPrototypeOf(this, MissingExtrinsicError.prototype);
    }
}