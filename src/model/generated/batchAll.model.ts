import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_} from "typeorm"

@Entity_()
export class BatchAll {
  constructor(props?: Partial<BatchAll>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_()
  id!: string

  @Column_("text", {array: true, nullable: true})
  calls!: (string | undefined | null)[] | undefined | null
}
