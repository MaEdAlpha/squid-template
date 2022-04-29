import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_} from "typeorm"
import * as marshal from "./marshal"
import {ResourceType, fromJsonResourceType} from "./_resourceType"

@Entity_()
export class NFTResource {
  constructor(props?: Partial<NFTResource>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_()
  id!: string

  @Column_("jsonb", {transformer: {to: obj => obj.map((val: any) => val == null ? undefined : val.toJSON()), from: obj => marshal.fromList(obj, val => val == null ? undefined : fromJsonResourceType(val))}, nullable: false})
  resources!: (ResourceType | undefined | null)[]

  @Column_("text", {array: true, nullable: false})
  priority!: (string | undefined | null)[]

  @Column_("text", {nullable: false})
  rootowner!: string
}
