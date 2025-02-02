"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FixedParts = void 0;
const assert_1 = __importDefault(require("assert"));
const marshal = __importStar(require("./marshal"));
class FixedParts {
    constructor(props, json) {
        this.isTypeOf = 'FixedParts';
        Object.assign(this, props);
        if (json != null) {
            this._type = json.type == null ? undefined : marshal.string.fromJSON(json.type);
            this._id = marshal.id.fromJSON(json.id);
            this._src = json.src == null ? undefined : marshal.string.fromJSON(json.src);
            this._z = marshal.int.fromJSON(json.z);
        }
    }
    get type() {
        return this._type;
    }
    set type(value) {
        this._type = value;
    }
    get id() {
        (0, assert_1.default)(this._id != null, 'uninitialized access');
        return this._id;
    }
    set id(value) {
        this._id = value;
    }
    get src() {
        return this._src;
    }
    set src(value) {
        this._src = value;
    }
    get z() {
        (0, assert_1.default)(this._z != null, 'uninitialized access');
        return this._z;
    }
    set z(value) {
        this._z = value;
    }
    toJSON() {
        return {
            isTypeOf: this.isTypeOf,
            type: this.type,
            id: this.id,
            src: this.src,
            z: this.z,
        };
    }
}
exports.FixedParts = FixedParts;
//# sourceMappingURL=_fixedParts.js.map