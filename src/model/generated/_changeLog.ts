import assert from "assert"
import * as marshal from "./marshal"

export class ChangeLog {
  private _old!: string | undefined | null
  private _new!: string | undefined | null

  constructor(props?: Partial<Omit<ChangeLog, 'toJSON'>>, json?: any) {
    Object.assign(this, props)
    if (json != null) {
      this._old = json.old == null ? undefined : marshal.string.fromJSON(json.old)
      this._new = json.new == null ? undefined : marshal.string.fromJSON(json.new)
    }
  }

  get old(): string | undefined | null {
    return this._old
  }

  set old(value: string | undefined | null) {
    this._old = value
  }

  get new(): string | undefined | null {
    return this._new
  }

  set new(value: string | undefined | null) {
    this._new = value
  }

  toJSON(): object {
    return {
      old: this.old,
      new: this.new,
    }
  }
}
