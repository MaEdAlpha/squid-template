import assert from "assert"
import * as marshal from "./marshal"
import {NFTS} from "./nfts.model"

export class NFTChildResource {
  public readonly isTypeOf = 'NFTChildResource'
  private _pending!: boolean
  private _id!: string
  private _slot!: string
  private _thumb!: string
  private _childNfts!: string | undefined | null

  constructor(props?: Partial<Omit<NFTChildResource, 'toJSON'>>, json?: any) {
    Object.assign(this, props)
    if (json != null) {
      this._pending = marshal.boolean.fromJSON(json.pending)
      this._id = marshal.id.fromJSON(json.id)
      this._slot = marshal.string.fromJSON(json.slot)
      this._thumb = marshal.string.fromJSON(json.thumb)
      this._childNfts = json.childNfts == null ? undefined : marshal.string.fromJSON(json.childNfts)
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

  get childNfts(): string | undefined | null {
    return this._childNfts
  }

  set childNfts(value: string | undefined | null) {
    this._childNfts = value
  }

  toJSON(): object {
    return {
      isTypeOf: this.isTypeOf,
      pending: this.pending,
      id: this.id,
      slot: this.slot,
      thumb: this.thumb,
      childNfts: this.childNfts,
    }
  }
}
