import assert from "assert"
import * as marshal from "./marshal"

export class NFTParentResources {
  public readonly isTypeOf = 'NFTParentResources'
  private _pending!: boolean
  private _id!: string
  private _base!: string
  private _parts!: (string | undefined | null)[]
  private _thumb!: string

  constructor(props?: Partial<Omit<NFTParentResources, 'toJSON'>>, json?: any) {
    Object.assign(this, props)
    if (json != null) {
      this._pending = marshal.boolean.fromJSON(json.pending)
      this._id = marshal.id.fromJSON(json.id)
      this._base = marshal.string.fromJSON(json.base)
      this._parts = marshal.fromList(json.parts, val => val == null ? undefined : marshal.string.fromJSON(val))
      this._thumb = marshal.string.fromJSON(json.thumb)
    }
  }

  get pending(): boolean {
    assert(this._pending != null, 'uninitialized access')
    return this._pending
  }

  set pending(value: boolean) {
    this._pending = value
  }

  get id(): string {
    assert(this._id != null, 'uninitialized access')
    return this._id
  }

  set id(value: string) {
    this._id = value
  }

  get base(): string {
    assert(this._base != null, 'uninitialized access')
    return this._base
  }

  set base(value: string) {
    this._base = value
  }

  get parts(): (string | undefined | null)[] {
    assert(this._parts != null, 'uninitialized access')
    return this._parts
  }

  set parts(value: (string | undefined | null)[]) {
    this._parts = value
  }

  get thumb(): string {
    assert(this._thumb != null, 'uninitialized access')
    return this._thumb
  }

  set thumb(value: string) {
    this._thumb = value
  }

  toJSON(): object {
    return {
      isTypeOf: this.isTypeOf,
      pending: this.pending,
      id: this.id,
      base: this.base,
      parts: this.parts.map((val: any) => val),
      thumb: this.thumb,
    }
  }
}
