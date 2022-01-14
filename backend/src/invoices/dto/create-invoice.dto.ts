import { CreateCustomerDto } from "src/customers/dto/create-customer.dto"
import { Note } from "src/customers/entities/customer.entity"
import { Expanse } from "src/expanses/entities/expanse.entity"
import { Item } from "src/items/entities/item.entity"
import { Tag } from "src/tags/entities/tag.entity"
import { Discount, PaymentMethod, Status, TermAndConditon } from "../entities/invoice.entity"

export class CreateInvoiceDto {
    internalId?: string
    date: Date
    status?: Status
    customer: CreateCustomerDto
    isInclusiveTax?: boolean
    dueDate: Date
    currencyCode?: string
    exchangeRage?: number
    isDiscountBeforeTax?: boolean
    expectedPaymentDate?: Date
    lastPaymentDate?: Date
    paymentTerm: number
    notes?: Note[]
    tags: Tag[]
    termsAndConditions?: TermAndConditon[]
    items?: Item[]
    perItemDiscounts?: Discount[]
    perItemShippingCharges?: number[]
    perItemQuantities?: number[]
    expanses?: Expanse[]
    perExpanseBillablePercentage?: number[]
    paymentMethod: PaymentMethod
}
