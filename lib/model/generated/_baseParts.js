"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromJsonBaseParts = void 0;
const _fixedParts_1 = require("./_fixedParts");
const _equippableParts_1 = require("./_equippableParts");
function fromJsonBaseParts(json) {
    switch (json?.isTypeOf) {
        case 'FixedParts': return new _fixedParts_1.FixedParts(undefined, json);
        case 'EquippableParts': return new _equippableParts_1.EquippableParts(undefined, json);
        default: throw new TypeError('Unknown json object passed as BaseParts');
    }
}
exports.fromJsonBaseParts = fromJsonBaseParts;
//# sourceMappingURL=_baseParts.js.map