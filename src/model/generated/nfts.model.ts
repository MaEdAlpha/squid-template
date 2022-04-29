import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_} from "typeorm"
import * as marshal from "./marshal"
import {ChangeLog} from "./_changeLog"
import {NFTChildren} from "./_nftChildren"

@Entity_()
export class NFTS {
  constructor(props?: Partial<NFTS>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_()
  id!: string

  @Column_("text", {nullable: false})
  collection!: string

  @Column_("text", {nullable: false})
  sn!: string

  @Column_("integer", {nullable: false})
  block!: number

  @Column_("text", {nullable: false})
  owner!: string

  @Column_("text", {nullable: false})
  rootowner!: string

  @Column_("jsonb", {transformer: {to: obj => obj == null ? undefined : obj.map((val: any) => val == null ? undefined : val.toJSON()), from: obj => obj == null ? undefined : marshal.fromList(obj, val => val == null ? undefined : new ChangeLog(undefined, val))}, nullable: true})
  changes!: (ChangeLog | undefined | null)[] | undefined | null

  @Column_("text", {array: true, nullable: true})
  priority!: (string | undefined | null)[] | undefined | null

  @Column_("jsonb", {transformer: {to: obj => obj == null ? undefined : obj.map((val: any) => val == null ? undefined : val.toJSON()), from: obj => obj == null ? undefined : marshal.fromList(obj, val => val == null ? undefined : new NFTChildren(undefined, val))}, nullable: true})
  children!: (NFTChildren | undefined | null)[] | undefined | null

  @Column_("bool", {nullable: false})
  pending!: boolean

  @Column_("text", {nullable: false})
  metadata!: string

  @Column_("integer", {nullable: false})
  transferable!: number

  @Column_("text", {nullable: false})
  forsale!: string

  @Column_("text", {nullable: false})
  burned!: string

  @Column_("text", {nullable: false})
  symbol!: string
}
