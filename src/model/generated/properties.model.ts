import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, OneToOne as OneToOne_, Index as Index_, JoinColumn as JoinColumn_} from "typeorm"
import * as marshal from "./marshal"
import {RoyaltyValue} from "./_royaltyValue"
import {AttrributeValue} from "./_attrributeValue"
import {NFTS} from "./nfts.model"

@Entity_()
export class Properties {
  constructor(props?: Partial<Properties>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_()
  id!: string

  @Column_("jsonb", {transformer: {to: obj => obj == null ? undefined : obj.toJSON(), from: obj => obj == null ? undefined : new RoyaltyValue(undefined, obj)}, nullable: true})
  royaltyInfo!: RoyaltyValue | undefined | null

  @Column_("jsonb", {transformer: {to: obj => obj == null ? undefined : obj.toJSON(), from: obj => obj == null ? undefined : new AttrributeValue(undefined, obj)}, nullable: true})
  attributes!: AttrributeValue | undefined | null

  @Column_("jsonb", {transformer: {to: obj => obj == null ? undefined : obj.toJSON(), from: obj => obj == null ? undefined : new AttrributeValue(undefined, obj)}, nullable: true})
  itemAttributes!: AttrributeValue | undefined | null

  @Column_("jsonb", {transformer: {to: obj => obj == null ? undefined : obj.toJSON(), from: obj => obj == null ? undefined : new AttrributeValue(undefined, obj)}, nullable: true})
  baseAttributes!: AttrributeValue | undefined | null

  @Index_({unique: true})
  @OneToOne_(() => NFTS, {nullable: false})
  @JoinColumn_()
  nftProperties!: NFTS
}
