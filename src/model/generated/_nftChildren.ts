import assert from "assert"
import * as marshal from "./marshal"

export class NFTChildren {
  private _id!: string
  private _pending!: boolean | undefined | null
  private _equipped!: string | undefined | null

  constructor(props?: Partial<Omit<NFTChildren, 'toJSON'>>, json?: any) {
    Object.assign(this, props)
    if (json != null) {
      this._id = marshal.id.fromJSON(json.id)
      this._pending = json.pending == null ? undefined : marshal.boolean.fromJSON(json.pending)
      this._equipped = json.equipped == null ? undefined : marshal.string.fromJSON(json.equipped)
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

  get equipped(): string | undefined | null {
    return this._equipped
  }

  set equipped(value: string | undefined | null) {
    this._equipped = value
  }

  toJSON(): object {
    return {
      id: this.id,
      pending: this.pending,
      equipped: this.equipped,
    }
  }
}
