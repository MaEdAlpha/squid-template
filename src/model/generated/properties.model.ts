import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_} from "typeorm"

@Entity_()
export class Properties {
  constructor(props?: Partial<Properties>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_()
  id!: string

  @Column_("text", {nullable: false})
  royaltyInfo!: string

  @Column_("text", {nullable: true})
  attributes!: string | undefined | null

  @Column_("text", {nullable: true})
  rarity!: string | undefined | null

  @Column_("text", {nullable: true})
  race!: string | undefined | null

  @Column_("text", {nullable: true})
  rootowner!: string | undefined | null
}
