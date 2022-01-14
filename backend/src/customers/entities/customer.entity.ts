import { Description } from "src/description.interface";
import { Name } from "src/name.interface";
import { Tag } from "src/tags/entities/tag.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

export enum Salutation {
    MR,
    MRS,
    MISS,
    PROF,
    DR,
    COMPANY,
    INSTITUE,
    GOVERMENT
}

export interface Discount {
    name: Name
    value: number
}

export interface Note {
    name: Name
    description: Description
}

export enum Status {
    ACTIVE,
    INACTIVE,
    CLOSED,
    REOPENED
}

export interface Address {
    salutation?: Salutation
    street1: string
    street2?: string
    state?: string
    region?: string
    city: string
    zip: string
    countryCode: string
    notes?: Note[]
}

export interface TaxId {
    countryCode: string
    value: number
}

export interface SocialMedia {
    facebook?: string
    twitter?: string
    linkedIn?: string
    skype?: string
    github?: string
    gitlab?: string
    jira?: string
    confluence?: string
    hangout?: string
    website?: string
}

@Entity()
export class Customer {
    @PrimaryGeneratedColumn()
    public id: number

    @Column({ unique: true })
    public internalId: string

    @Column({ type: 'jsonb' })
    public displayName: Name

    @Column({ type: 'jsonb' })
    public companyName: Name

    @Column({ type: 'int' })
    public salutation: Salutation

    @Column()
    public firstName: string

    @Column()
    public lastName: string

    @ManyToMany(() => Tag, { eager: true, cascade: true })
    @JoinTable()
    public tags: Tag[]

    @Column({ type: 'timestamptz' })
    public dateOfBirth: Date

    @Column()
    public phone: string

    @Column({ default: 'EUR' })
    public currencyCode: string

    @Column({ type: 'int', default: Status.INACTIVE })
    public status: Status

    @Column({ type: 'decimal', default: 0 })
    public creditLimit: number

    @Column({ type: 'jsonb' })
    public billingAddress: Address

    @Column({ type: 'jsonb' })
    public shippingAddress: Address

    @Column()
    public fax: string

    @Column({ type: 'jsonb' })
    public socialMedia: SocialMedia

    @Column({ type: 'jsonb' })
    public departament: Name

    @Column({ type: 'jsonb' })
    public designation: Name

    @Column({ type: 'jsonb' })
    public description: Description

    @Column()
    public paymentTerm: number

    @Column()
    public email: string

    @Column()
    public mobilePhone: string

    @Column()
    public source: string

    @Column()
    public referenceId: string

    @Column({ default: false })
    public paymentReminder: boolean

    @Column({ type: 'jsonb' })
    public discounts: Discount[]

    @Column({ type: 'jsonb' })
    public notes: Note[]

    @Column({ type: 'jsonb' })
    public taxId: TaxId
}
