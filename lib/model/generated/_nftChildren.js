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
exports.NFTChildren = void 0;
const assert_1 = __importDefault(require("assert"));
const marshal = __importStar(require("./marshal"));
class NFTChildren {
    constructor(props, json) {
        Object.assign(this, props);
        if (json != null) {
            this._id = marshal.id.fromJSON(json.id);
            this._pending = json.pending == null ? undefined : marshal.boolean.fromJSON(json.pending);
            this._equipped = json.equipped == null ? undefined : marshal.string.fromJSON(json.equipped);
        }
    }
    get id() {
        (0, assert_1.default)(this._id != null, 'uninitialized access');
        return this._id;
    }
    set id(value) {
        this._id = value;
    }
    get pending() {
        return this._pending;
    }
    set pending(value) {
        this._pending = value;
    }
    get equipped() {
        return this._equipped;
    }
    set equipped(value) {
        this._equipped = value;
    }
    toJSON() {
        return {
            id: this.id,
            pending: this.pending,
            equipped: this.equipped,
        };
    }
}
exports.NFTChildren = NFTChildren;
//# sourceMappingURL=_nftChildren.js.map