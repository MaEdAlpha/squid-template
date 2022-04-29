import assert from "assert"
import * as marshal from "./marshal"

export class NFTChildResource {
  public readonly isTypeOf = 'NFTChildResource'
  private _pending!: boolean | undefined | null
  private _id!: string
  private _slot!: string
  private _thumb!: string

  constructor(props?: Partial<Omit<NFTChildResource, 'toJSON'>>, json?: any) {
    Object.assign(this, props)
    if (json != null) {
      this._pending = json.pending == null ? undefined : marshal.boolean.fromJSON(json.pending)
      this._id = marshal.id.fromJSON(json.id)
      this._slot = marshal.string.fromJSON(json.slot)
      this._thumb = marshal.string.fromJSON(json.thumb)
    }
  }

  get pending(): boolean | undefined | null {
    return this._pending
  }

  set pending(value: boolean | undefined | null) {
    this._pending = value
  }

  get id(): string {
    assert(this._id != null, 'uninitialized access')
    return this._id
  }

  set id(value: string) {
    this._id = value
  }

  get slot(): string {
    assert(this._slot != null, 'uninitialized access')
    return this._slot
  }

  set slot(value: string) {
    this._slot = value
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
      slot: this.slot,
      thumb: this.thumb,
    }
  }
}
