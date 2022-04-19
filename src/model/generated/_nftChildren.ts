import assert from "assert"
import * as marshal from "./marshal"
import {NFTS} from "./nfts.model"

export class NFTChildren {
  private _id!: string
  private _pending!: boolean | undefined | null
  private _equipped!: string
  private _childNft!: string | undefined | null

  constructor(props?: Partial<Omit<NFTChildren, 'toJSON'>>, json?: any) {
    Object.assign(this, props)
    if (json != null) {
      this._id = marshal.string.fromJSON(json.id)
      this._pending = json.pending == null ? undefined : marshal.boolean.fromJSON(json.pending)
      this._equipped = marshal.string.fromJSON(json.equipped)
      this._childNft = json.childNft == null ? undefined : marshal.string.fromJSON(json.childNft)
    }
  }

  get id(): string {
    assert(this._id != null, 'uninitialized access')
    return this._id
  }

  set id(value: string) {
    this._id = value
  }

  get pending(): boolean | undefined | null {
    return this._pending
  }

  set pending(value: boolean | undefined | null) {
    this._pending = value
  }

  get equipped(): string {
    assert(this._equipped != null, 'uninitialized access')
    return this._equipped
  }

  set equipped(value: string) {
    this._equipped = value
  }

  get childNft(): string | undefined | null {
    return this._childNft
  }

  set childNft(value: string | undefined | null) {
    this._childNft = value
  }

  toJSON(): object {
    return {
      id: this.id,
      pending: this.pending,
      equipped: this.equipped,
      childNft: this.childNft,
    }
  }
}
