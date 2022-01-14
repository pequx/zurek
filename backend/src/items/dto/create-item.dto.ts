import { Description } from "src/description.interface"
import { Name } from "src/name.interface"
import { Tag } from "src/tags/entities/tag.entity"
import { Tax } from "src/taxes/entities/tax.entity"
import { Status, Type } from "../entities/item.entity"

export class CreateItemDto {
    internalId?: string
    name?: Name
    description?: Description
    tags?: Tag[]
    price: number
    tax: Tax
    type: Type
    source?: string
    referenceId?: string
    status?: Status
    unit?: Name
}
