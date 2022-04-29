import {NFTParentResources} from "./_nftParentResources"
import {NFTChildResource} from "./_nftChildResource"

export type ResourceType = NFTParentResources | NFTChildResource

export function fromJsonResourceType(json: any): ResourceType {
  switch(json?.isTypeOf) {
    case 'NFTParentResources': return new NFTParentResources(undefined, json)
    case 'NFTChildResource': return new NFTChildResource(undefined, json)
    default: throw new TypeError('Unknown json object passed as ResourceType')
  }
}
