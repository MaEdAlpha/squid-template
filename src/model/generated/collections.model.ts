import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_} from "typeorm"

@Entity_()
export class Collections {
  constructor(props?: Partial<Collections>) {
    Object.assign(this, props)
  }

  @Column_("text", {array: true, nullable: true})
  changes!: (string | undefined | null)[] | undefined | null

  @Column_("integer", {nullable: false})
  block!: number

  @Column_("integer", {nullable: false})
  max!: number

  @Column_("text", {nullable: false})
  issuer!: string

  @Column_("text", {nullable: false})
  symbol!: string

  @PrimaryColumn_()
  id!: string

  @Column_("text", {nullable: false})
  metadata!: string
}
