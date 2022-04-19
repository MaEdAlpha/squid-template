import assert from "assert"
import * as marshal from "./marshal"
import {NftAttributesValue} from "./_nftAttributesValue"
import {Properties} from "./_properties"

export class AttrributeValue {
  private _type!: string | undefined | null
  private _value!: NftAttributesValue | undefined | null
  private _attributeProps!: Properties

  constructor(props?: Partial<Omit<AttrributeValue, 'toJSON'>>, json?: any) {
    Object.assign(this, props)
    if (json != null) {
      this._type = json.type == null ? undefined : marshal.string.fromJSON(json.type)
      this._value = json.value == null ? undefined : new NftAttributesValue(undefined, json.value)
      this._attributeProps = new Properties(undefined, marshal.nonNull(json.attributeProps))
    }
  }

  get type(): string | undefined | null {
    return this._type
  }

  set type(value: string | undefined | null) {
    this._type = value
  }

  get value(): NftAttributesValue | undefined | null {
    return this._value
  }

  set value(value: NftAttributesValue | undefined | null) {
    this._value = value
  }

  get attributeProps(): Properties {
    assert(this._attributeProps != null, 'uninitialized access')
    return this._attributeProps
  }

  set attributeProps(value: Properties) {
    this._attributeProps = value
  }

  toJSON(): object {
    return {
      type: this.type,
      value: this.value == null ? undefined : this.value.toJSON(),
      attributeProps: this.attributeProps.toJSON(),
    }
  }
}
