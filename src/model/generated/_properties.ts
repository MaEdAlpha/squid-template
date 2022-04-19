import assert from "assert"
import * as marshal from "./marshal"
import {RoyaltyValue} from "./_royaltyValue"
import {AttrributeValue} from "./_attrributeValue"

export class Properties {
  private _royaltyInfo!: RoyaltyValue | undefined | null
  private _attributes!: AttrributeValue | undefined | null

  constructor(props?: Partial<Omit<Properties, 'toJSON'>>, json?: any) {
    Object.assign(this, props)
    if (json != null) {
      this._royaltyInfo = json.royaltyInfo == null ? undefined : new RoyaltyValue(undefined, json.royaltyInfo)
      this._attributes = json.attributes == null ? undefined : new AttrributeValue(undefined, json.attributes)
    }
  }

  get royaltyInfo(): RoyaltyValue | undefined | null {
    return this._royaltyInfo
  }

  set royaltyInfo(value: RoyaltyValue | undefined | null) {
    this._royaltyInfo = value
  }

  get attributes(): AttrributeValue | undefined | null {
    return this._attributes
  }

  set attributes(value: AttrributeValue | undefined | null) {
    this._attributes = value
  }

  toJSON(): object {
    return {
      royaltyInfo: this.royaltyInfo == null ? undefined : this.royaltyInfo.toJSON(),
      attributes: this.attributes == null ? undefined : this.attributes.toJSON(),
    }
  }
}
