import { Customer } from "src/customers/entities/customer.entity";
import { Description } from "src/description.interface";
import { Expanse } from "src/expanses/entities/expanse.entity";
import { Item } from "src/items/entities/item.entity";
import { Name } from "src/name.interface";
import { Tag } from "src/tags/entities/tag.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

export enum Status {
    DRAFT,
    OPEN,
    PAID,
    CLOSED
}

export interface Discount {
    name: Name
    value: number
}

export interface Note {
    name: Name
    description: Description
}

export interface TermAndConditon {
    name: Name
    description: Description
}

export interface PaymentMethod {
    name: Name
    description: Description
    discounts: Discount[]
}


@Entity()
export class Invoice {
    @PrimaryGeneratedColumn()
    public id: number

    @Column({ unique: true })
    public internalId: string

    @Column({ type: 'timestamptz' })
    public date: Date

    @Column({ type: 'int', default: Status.DRAFT })
    public status: Status

    @OneToOne(() => Customer, { eager: true, cascade: true })
    @JoinColumn()
    public customer: Customer

    @Column({ default: false })
    public isInclusiveTax: boolean

    @Column({ type: 'timestamptz' })
    public dueDate: Date

    @Column({ default: 'EUR' })
    public currencyCode: string

    @Column({ default: 1 })
    public exchangeRage: number

    @Column({ type: 'jsonb' })
    public discounts: Discount[]

    @Column({ default: true })
    public isDiscountBeforeTax: boolean

    // @Column()
    // public templateName: string

    @Column({ type: 'timestamptz' })
    public expectedPaymentDate: Date

    @Column({ type: 'timestamptz' })
    public lastPaymentDate: Date

    @Column()
    public paymentTerm: number

    @Column({ type: 'jsonb' })
    public notes: Note[]

    @ManyToMany(() => Tag, { eager: true, cascade: true })
    @JoinTable()
    public tags: Tag[]

    @Column({ type: 'jsonb' })
    termsAndConditions: TermAndConditon[]

    @ManyToMany(() => Item, { eager: true, cascade: true })
    @JoinTable()
    public items: Item[]

    @Column({ type: 'jsonb' })
    public perItemDiscounts: Discount[]

    @Column({ type: 'jsonb' })
    public perItemShippingCharges: number[]

    @Column({ type: 'jsonb' })
    public perItemQuantities: number[]

    @ManyToMany(() => Expanse, { eager: true, cascade: true })
    @JoinTable()
    public expanses: Expanse[]

    @Column({ type: 'jsonb' })
    public perExpanseBillablePercentage: number[]

    @Column({ type: 'jsonb' })
    public paymentMethod: PaymentMethod
}
