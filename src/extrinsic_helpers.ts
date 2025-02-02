import {ExtrinsicHandlerContext,  } from "@subsquid/substrate-processor";
import { SystemRemarkCall, UtilityBatchAllCall } from "./types/calls";


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