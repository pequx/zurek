import { Address } from "cluster"
import { Description } from "src/description.interface"
import { Name } from "src/name.interface"
import { CreateTagDto } from "src/tags/dto/create-tag.dto"
import { Discount, Note, Salutation, SocialMedia, Status, TaxId } from "../entities/customer.entity"

export class CreateCustomerDto {
    internalId?: string
    displayName: Name
    companyName?: Name
    salutation?: Salutation
    firstName?: string
    lastName?: string
    tags?: CreateTagDto[]
    dateOfBirth?: Date
    phone?: string
    currencyCode?: string
    status?: Status
    creditLimit?: number
    billingAddress: Address
    shippingAddress?: Address
    fax?: string
    socialMedia?: SocialMedia
    departament?: Name
    designation?: Name
    description?: Description
    paymentTerm?: number
    email: string
    mobilePhone?: string
    source?: string
    referenceId?: string
    paymentReminder?: boolean
    discounts?: Discount[]
    notes?: Note[]
    taxId?: TaxId
}
