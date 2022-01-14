import { Customer } from "src/customers/entities/customer.entity";
import { Description } from "src/description.interface";
import { Name } from "src/name.interface";
import { Tag } from "src/tags/entities/tag.entity";
import { Tax } from "src/taxes/entities/tax.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Expanse {
    @PrimaryGeneratedColumn()
    public id: number

    @Column({ unique: true })
    public internalId: string

    @Column({ type: 'timestamptz' })
    public date: Date

    @Column({ type: 'jsonb' })
    public name: Name

    @Column({ type: 'jsonb' })
    public description: Description

    @ManyToMany(() => Tag, { eager: true, cascade: true })
    @JoinTable()
    public tags: Tag[]

    @Column({ default: 'EUR' })
    public currencyCode: string

    @Column({ type: 'decimal', default: 1 })
    public exchangeRate: number

    @Column({ default: true })
    public isInclusiveTax: boolean

    @OneToOne(() => Tax, { eager: true, cascade: true })
    @JoinColumn()
    public tax: Tax

    @Column({ type: 'decimal' })
    public milageRate: number

    @Column({ type: 'decimal' })
    public distance: number

    @Column({ type: 'decimal' })
    public amount: number

    @Column()
    public referenceId: string

    @Column({ default: false })
    public isBillable: boolean

    @Column({ type: 'decimal' })
    public billableAmount: number

    @OneToOne(() => Customer, { eager: true, cascade: true })
    @JoinColumn()
    public customer: Customer

    @Column()
    public project: string
}
