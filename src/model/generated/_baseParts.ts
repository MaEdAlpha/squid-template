import {FixedParts} from "./_fixedParts"
import {EquippableParts} from "./_equippableParts"

export type BaseParts = FixedParts | EquippableParts

export function fromJsonBaseParts(json: any): BaseParts {
  switch(json?.isTypeOf) {
    case 'FixedParts': return new FixedParts(undefined, json)
    case 'EquippableParts': return new EquippableParts(undefined, json)
    default: throw new TypeError('Unknown json object passed as BaseParts')
  }
}
