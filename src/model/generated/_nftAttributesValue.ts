import assert from "assert"
import * as marshal from "./marshal"
import {AttrributeValue} from "./_attrributeValue"

export class NftAttributesValue {
  private _health!: string | undefined | null
  private _attack!: string | undefined | null
  private _defense!: string | undefined | null
  private _speed!: string | undefined | null
  private _rarity!: string | undefined | null
  private _class!: string | undefined | null
  private _race!: string | undefined | null
  private _typevalue!: AttrributeValue | undefined | null

  constructor(props?: Partial<Omit<NftAttributesValue, 'toJSON'>>, json?: any) {
    Object.assign(this, props)
    if (json != null) {
      this._health = json.health == null ? undefined : marshal.string.fromJSON(json.health)
      this._attack = json.attack == null ? undefined : marshal.string.fromJSON(json.attack)
      this._defense = json.defense == null ? undefined : marshal.string.fromJSON(json.defense)
      this._speed = json.speed == null ? undefined : marshal.string.fromJSON(json.speed)
      this._rarity = json.rarity == null ? undefined : marshal.string.fromJSON(json.rarity)
      this._class = json.class == null ? undefined : marshal.string.fromJSON(json.class)
      this._race = json.race == null ? undefined : marshal.string.fromJSON(json.race)
      this._typevalue = json.typevalue == null ? undefined : new AttrributeValue(undefined, json.typevalue)
    }
  }

  get health(): string | undefined | null {
    return this._health
  }

  set health(value: string | undefined | null) {
    this._health = value
  }

  get attack(): string | undefined | null {
    return this._attack
  }

  set attack(value: string | undefined | null) {
    this._attack = value
  }

  get defense(): string | undefined | null {
    return this._defense
  }

  set defense(value: string | undefined | null) {
    this._defense = value
  }

  get speed(): string | undefined | null {
    return this._speed
  }

  set speed(value: string | undefined | null) {
    this._speed = value
  }

  get rarity(): string | undefined | null {
    return this._rarity
  }

  set rarity(value: string | undefined | null) {
    this._rarity = value
  }

  get class(): string | undefined | null {
    return this._class
  }

  set class(value: string | undefined | null) {
    this._class = value
  }

  get race(): string | undefined | null {
    return this._race
  }

  set race(value: string | undefined | null) {
    this._race = value
  }

  get typevalue(): AttrributeValue | undefined | null {
    return this._typevalue
  }

  set typevalue(value: AttrributeValue | undefined | null) {
    this._typevalue = value
  }

  toJSON(): object {
    return {
      health: this.health,
      attack: this.attack,
      defense: this.defense,
      speed: this.speed,
      rarity: this.rarity,
      class: this.class,
      race: this.race,
      typevalue: this.typevalue == null ? undefined : this.typevalue.toJSON(),
    }
  }
}
