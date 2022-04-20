import assert from "assert"
import * as marshal from "./marshal"
import {NFTS} from "./nfts.model"

export class NFTChildResource {
  public readonly isTypeOf = 'NFTChildResource'
  private _pending!: boolean | undefined | null
  private _id!: string | undefined | null
  private _slot!: string | undefined | null
  private _thumb!: string | undefined | null
  private _childNfts!: string | undefined | null

  constructor(props?: Partial<Omit<NFTChildResource, 'toJSON'>>, json?: any) {
    Object.assign(this, props)
    if (json != null) {
      this._pending = json.pending == null ? undefined : marshal.boolean.fromJSON(json.pending)
      this._id = json.id == null ? undefined : marshal.id.fromJSON(json.id)
      this._slot = json.slot == null ? undefined : marshal.string.fromJSON(json.slot)
      this._thumb = json.thumb == null ? undefined : marshal.string.fromJSON(json.thumb)
      this._childNfts = json.childNfts == null ? undefined : marshal.string.fromJSON(json.childNfts)
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

  get slot(): string | undefined | null {
    return this._slot
  }

  set slot(value: string | undefined | null) {
    this._slot = value
  }

  get thumb(): string | undefined | null {
    return this._thumb
  }

  set thumb(value: string | undefined | null) {
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
