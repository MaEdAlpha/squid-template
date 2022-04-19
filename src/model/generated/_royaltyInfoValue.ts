import assert from "assert"
import * as marshal from "./marshal"
import {RoyaltyValue} from "./_royaltyValue"

export class RoyaltyInfoValue {
  private _royaltyPercentFloat!: string | undefined | null
  private _reciever!: string
  private _royaltyvalue!: RoyaltyValue | undefined | null

  constructor(props?: Partial<Omit<RoyaltyInfoValue, 'toJSON'>>, json?: any) {
    Object.assign(this, props)
    if (json != null) {
      this._royaltyPercentFloat = json.royaltyPercentFloat == null ? undefined : marshal.string.fromJSON(json.royaltyPercentFloat)
      this._reciever = marshal.string.fromJSON(json.reciever)
      this._royaltyvalue = json.royaltyvalue == null ? undefined : new RoyaltyValue(undefined, json.royaltyvalue)
    }
  }

  get royaltyPercentFloat(): string | undefined | null {
    return this._royaltyPercentFloat
  }

  set royaltyPercentFloat(value: string | undefined | null) {
    this._royaltyPercentFloat = value
  }

  get reciever(): string {
    assert(this._reciever != null, 'uninitialized access')
    return this._reciever
  }

  set reciever(value: string) {
    this._reciever = value
  }

  get royaltyvalue(): RoyaltyValue | undefined | null {
    return this._royaltyvalue
  }

  set royaltyvalue(value: RoyaltyValue | undefined | null) {
    this._royaltyvalue = value
  }

  toJSON(): object {
    return {
      royaltyPercentFloat: this.royaltyPercentFloat,
      reciever: this.reciever,
      royaltyvalue: this.royaltyvalue == null ? undefined : this.royaltyvalue.toJSON(),
    }
  }
}
