import assert from "assert"
import * as marshal from "./marshal"

export class NFTParentResources {
  public readonly isTypeOf = 'NFTParentResources'
  private _pending!: boolean | undefined | null
  private _id!: string | undefined | null
  private _base!: string | undefined | null
  private _parts!: (string | undefined | null)[] | undefined | null
  private _thumb!: string | undefined | null

  constructor(props?: Partial<Omit<NFTParentResources, 'toJSON'>>, json?: any) {
    Object.assign(this, props)
    if (json != null) {
      this._pending = json.pending == null ? undefined : marshal.boolean.fromJSON(json.pending)
      this._id = json.id == null ? undefined : marshal.id.fromJSON(json.id)
      this._base = json.base == null ? undefined : marshal.string.fromJSON(json.base)
      this._parts = json.parts == null ? undefined : marshal.fromList(json.parts, val => val == null ? undefined : marshal.string.fromJSON(val))
      this._thumb = json.thumb == null ? undefined : marshal.string.fromJSON(json.thumb)
    }
  }

  get pending(): boolean | undefined | null {
    return this._pending
  }

  set pending(value: boolean | undefined | null) {
    this._pending = value
  }

  get id(): string | undefined | null {
    return this._id
  }

  set id(value: string | undefined | null) {
    this._id = value
  }

  get base(): string | undefined | null {
    return this._base
  }

  set base(value: string | undefined | null) {
    this._base = value
  }

  get parts(): (string | undefined | null)[] | undefined | null {
    return this._parts
  }

  set parts(value: (string | undefined | null)[] | undefined | null) {
    this._parts = value
  }

  get thumb(): string | undefined | null {
    return this._thumb
  }

  set thumb(value: string | undefined | null) {
    this._thumb = value
  }

  toJSON(): object {
    return {
      isTypeOf: this.isTypeOf,
      pending: this.pending,
      id: this.id,
      base: this.base,
      parts: this.parts == null ? undefined : this.parts.map((val: any) => val),
      thumb: this.thumb,
    }
  }
}
