import assert from "assert"
import * as marshal from "./marshal"

export class EquippableParts {
  public readonly isTypeOf = 'EquippableParts'
  private _equippable!: (string | undefined | null)[] | undefined | null
  private _type!: string | undefined | null
  private _id!: string
  private _z!: number

  constructor(props?: Partial<Omit<EquippableParts, 'toJSON'>>, json?: any) {
    Object.assign(this, props)
    if (json != null) {
      this._equippable = json.equippable == null ? undefined : marshal.fromList(json.equippable, val => val == null ? undefined : marshal.string.fromJSON(val))
      this._type = json.type == null ? undefined : marshal.string.fromJSON(json.type)
      this._id = marshal.id.fromJSON(json.id)
      this._z = marshal.int.fromJSON(json.z)
    }
  }

  get equippable(): (string | undefined | null)[] | undefined | null {
    return this._equippable
  }

  set equippable(value: (string | undefined | null)[] | undefined | null) {
    this._equippable = value
  }

  get type(): string | undefined | null {
    return this._type
  }

  set type(value: string | undefined | null) {
    this._type = value
  }

  get id(): string {
    assert(this._id != null, 'uninitialized access')
    return this._id
  }

  set id(value: string) {
    this._id = value
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
      equippable: this.equippable == null ? undefined : this.equippable.map((val: any) => val),
      type: this.type,
      id: this.id,
      z: this.z,
    }
  }
}
