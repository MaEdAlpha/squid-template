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
exports.NFTParentResources = void 0;
const assert_1 = __importDefault(require("assert"));
const marshal = __importStar(require("./marshal"));
class NFTParentResources {
    constructor(props, json) {
        this.isTypeOf = 'NFTParentResources';
        Object.assign(this, props);
        if (json != null) {
            this._pending = json.pending == null ? undefined : marshal.boolean.fromJSON(json.pending);
            this._id = marshal.id.fromJSON(json.id);
            this._base = marshal.string.fromJSON(json.base);
            this._parts = marshal.fromList(json.parts, val => val == null ? undefined : marshal.string.fromJSON(val));
            this._thumb = marshal.string.fromJSON(json.thumb);
        }
    }
    get pending() {
        return this._pending;
    }
    set pending(value) {
        this._pending = value;
    }
    get id() {
        (0, assert_1.default)(this._id != null, 'uninitialized access');
        return this._id;
    }
    set id(value) {
        this._id = value;
    }
    get base() {
        (0, assert_1.default)(this._base != null, 'uninitialized access');
        return this._base;
    }
    set base(value) {
        this._base = value;
    }
    get parts() {
        (0, assert_1.default)(this._parts != null, 'uninitialized access');
        return this._parts;
    }
    set parts(value) {
        this._parts = value;
    }
    get thumb() {
        (0, assert_1.default)(this._thumb != null, 'uninitialized access');
        return this._thumb;
    }
    set thumb(value) {
        this._thumb = value;
    }
    toJSON() {
        return {
            isTypeOf: this.isTypeOf,
            pending: this.pending,
            id: this.id,
            base: this.base,
            parts: this.parts.map((val) => val),
            thumb: this.thumb,
        };
    }
}
exports.NFTParentResources = NFTParentResources;
//# sourceMappingURL=_nftParentResources.js.map