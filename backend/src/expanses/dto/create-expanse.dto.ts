import { Customer } from "src/customers/entities/customer.entity"
import { Description } from "src/description.interface"
import { Name } from "src/name.interface"
import { Tag } from "src/tags/entities/tag.entity"
import { Tax } from "src/taxes/entities/tax.entity"

export class CreateExpanseDto {
    internalId?: string
    date: Date
    name: Name
    description?: Description
    tags?: Tag[]
    currencyCode?: string
    exchangeRate?: number
    isInclusiveTax?: boolean
    tax: Tax
    milageRate?: number
    distance?: number
    amount: number
    referenceId?: string
    isBillable?: boolean
    billableAmount?: number
    customer?: Customer
    project?: string
}
