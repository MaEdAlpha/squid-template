import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_} from "typeorm"
import * as marshal from "./marshal"
import {BaseParts, fromJsonBaseParts} from "./_baseParts"

@Entity_()
export class Base {
  constructor(props?: Partial<Base>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_()
  id!: string

  @Column_("integer", {nullable: false})
  block!: number

  @Column_("text", {nullable: false})
  symbol!: string

  @Column_("text", {nullable: false})
  type!: string

  @Column_("text", {nullable: false})
  issuer!: string

  @Column_("jsonb", {transformer: {to: obj => obj.map((val: any) => val == null ? undefined : val.toJSON()), from: obj => marshal.fromList(obj, val => val == null ? undefined : fromJsonBaseParts(val))}, nullable: false})
  parts!: (BaseParts | undefined | null)[]
}
