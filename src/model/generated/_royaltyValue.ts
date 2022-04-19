import assert from "assert"
import * as marshal from "./marshal"
import {RoyaltyInfoValue} from "./_royaltyInfoValue"
import {Properties} from "./_properties"

export class RoyaltyValue {
  private _type!: string | undefined | null
  private _value!: RoyaltyInfoValue | undefined | null
  private _royaltyProps!: Properties

  constructor(props?: Partial<Omit<RoyaltyValue, 'toJSON'>>, json?: any) {
    Object.assign(this, props)
    if (json != null) {
      this._type = json.type == null ? undefined : marshal.string.fromJSON(json.type)
      this._value = json.value == null ? undefined : new RoyaltyInfoValue(undefined, json.value)
      this._royaltyProps = new Properties(undefined, marshal.nonNull(json.royaltyProps))
    }
  }

  get type(): string | undefined | null {
    return this._type
  }

  set type(value: string | undefined | null) {
    this._type = value
  }

  get value(): RoyaltyInfoValue | undefined | null {
    return this._value
  }

  set value(value: RoyaltyInfoValue | undefined | null) {
    this._value = value
  }

  get royaltyProps(): Properties {
    assert(this._royaltyProps != null, 'uninitialized access')
    return this._royaltyProps
  }

  set royaltyProps(value: Properties) {
    this._royaltyProps = value
  }

  toJSON(): object {
    return {
      type: this.type,
      value: this.value == null ? undefined : this.value.toJSON(),
      royaltyProps: this.royaltyProps.toJSON(),
    }
  }
}
