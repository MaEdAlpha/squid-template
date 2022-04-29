"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MissingExtrinsicError = exports.getBatchAllExtrinsic = exports.getRemarksExtrinsic = void 0;
const calls_1 = require("./types/calls");
function getRemarksExtrinsic(ctx) {
    if (!ctx.extrinsic) {
        throw new MissingExtrinsicError("missing extrinsic information");
    }
    let ex_ctx = ctx;
    const extrinsic = new calls_1.SystemRemarkCall(ex_ctx);
    if (extrinsic.isV1020) {
        const { remark } = extrinsic.asV1020;
        return remark;
    }
    throw new Error("No Runtime Version Found for Extrinsic");
}
exports.getRemarksExtrinsic = getRemarksExtrinsic;
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
function getBatchAllExtrinsic(ctx) {
    if (!ctx.extrinsic) {
        throw new MissingExtrinsicError("missing extrinsic information");
    }
    let ex_ctx = ctx;
    const extrinsic = new calls_1.UtilityBatchAllCall(ex_ctx);
    let remarkArray;
    if (extrinsic.isV2026) {
        if (true) {
            remarkArray = extrinsic.asV2026.calls.toString();
            return remarkArray;
        }
    }
    if (extrinsic.isV2028) {
        if (true) {
            remarkArray = extrinsic.asV2028.calls.toString();
            return remarkArray;
        }
    }
    if (extrinsic.isV2029) {
        if (true) {
            remarkArray = extrinsic.asV2029.calls.toString();
            return remarkArray;
        }
    }
    if (extrinsic.isV2030) {
        if (true) {
            remarkArray = extrinsic.asV2030.calls.toString();
            return remarkArray;
        }
    }
    if (extrinsic.isV9010) {
        if (true) {
            remarkArray = extrinsic.asV9010.calls.toString();
            return remarkArray;
        }
    }
    if (extrinsic.isV9040) {
        if (true) {
            remarkArray = extrinsic.asV9040.calls.toString();
            return remarkArray;
        }
    }
    if (extrinsic.isV9050) {
        if (true) {
            remarkArray = extrinsic.asV9050.calls.toString();
            return remarkArray;
        }
    }
    if (extrinsic.isV9080) {
        if (true) {
            remarkArray = extrinsic.asV9080.calls.toString();
            return remarkArray;
        }
    }
    if (extrinsic.isV9090) {
        if (true) {
            remarkArray = extrinsic.asV9090.calls.toString();
            return remarkArray;
        }
    }
    if (extrinsic.isV9100) {
        if (true) {
            remarkArray = extrinsic.asV9100.calls.toString();
            return remarkArray;
        }
    }
    if (extrinsic.isV9111) {
        if (true) {
            remarkArray = extrinsic.asV9111.calls.toString();
            return remarkArray;
        }
    }
    if (extrinsic.isV9122) {
        if (true) {
            remarkArray = extrinsic.asV9122.calls.toString();
            return remarkArray;
        }
    }
    if (extrinsic.isV9130) {
        if (true) {
            remarkArray = extrinsic.asV9130.calls.toString();
            return remarkArray;
        }
    }
    if (extrinsic.isV9160) {
        if (true) {
            remarkArray = extrinsic.asV9160.calls.toString();
            return remarkArray;
        }
    }
    if (extrinsic.isV9170) {
        if (true) {
            remarkArray = extrinsic.asV9170.calls.toString();
            return remarkArray;
        }
    }
    if (extrinsic.isV9180) {
        if (true) {
            remarkArray = extrinsic.asV9180.calls.toString();
            return remarkArray;
        }
    }
    throw new Error("No Runtime Version Found for Extrinsic");
}
exports.getBatchAllExtrinsic = getBatchAllExtrinsic;
class MissingExtrinsicError extends Error {
    constructor(m) {
        super(m);
        Object.setPrototypeOf(this, MissingExtrinsicError.prototype);
    }
}
exports.MissingExtrinsicError = MissingExtrinsicError;
//# sourceMappingURL=extrinsic_helpers.js.map