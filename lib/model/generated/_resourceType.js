"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromJsonResourceType = void 0;
const _nftParentResources_1 = require("./_nftParentResources");
const _nftChildResource_1 = require("./_nftChildResource");
function fromJsonResourceType(json) {
    switch (json?.isTypeOf) {
        case 'NFTParentResources': return new _nftParentResources_1.NFTParentResources(undefined, json);
        case 'NFTChildResource': return new _nftChildResource_1.NFTChildResource(undefined, json);
        default: throw new TypeError('Unknown json object passed as ResourceType');
    }
}
exports.fromJsonResourceType = fromJsonResourceType;
//# sourceMappingURL=_resourceType.js.map