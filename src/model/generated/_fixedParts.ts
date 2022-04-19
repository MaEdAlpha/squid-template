import assert from "assert"
import * as marshal from "./marshal"

export class FixedParts {
  public readonly isTypeOf = 'FixedParts'
  private _type!: string
  private _id!: string
  private _src!: string
  private _z!: number

  constructor(props?: Partial<Omit<FixedParts, 'toJSON'>>, json?: any) {
    Object.assign(this, props)
    if (json != null) {
      this._type = marshal.string.fromJSON(json.type)
      this._id = marshal.id.fromJSON(json.id)
      this._src = marshal.string.fromJSON(json.src)
      this._z = marshal.int.fromJSON(json.z)
    }
  }

  get type(): string {
    assert(this._type != null, 'uninitialized access')
    return this._type
  }

  set type(value: string) {
    this._type = value
  }

  get id(): string {
    assert(this._id != null, 'uninitialized access')
    return this._id
  }

  set id(value: string) {
    this._id = value
  }

  get src(): string {
    assert(this._src != null, 'uninitialized access')
    return this._src
  }

  set src(value: string) {
    this._src = value
  }

  get z(): number {
    assert(this._z != null, 'uninitialized access')
    return this._z
  }

  set z(value: number) {
    this._z = value
  }

  toJSON(): object {
    return {
      isTypeOf: this.isTypeOf,
      type: this.type,
      id: this.id,
      src: this.src,
      z: this.z,
    }
  }
}
