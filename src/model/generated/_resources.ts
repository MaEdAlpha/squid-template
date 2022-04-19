import {NFTParentResources} from "./_nftParentResources"
import {NFTChildResource} from "./_nftChildResource"

export type Resources = NFTParentResources | NFTChildResource

export function fromJsonResources(json: any): Resources {
  switch(json?.isTypeOf) {
    case 'NFTParentResources': return new NFTParentResources(undefined, json)
    case 'NFTChildResource': return new NFTChildResource(undefined, json)
    default: throw new TypeError('Unknown json object passed as Resources')
  }
}
