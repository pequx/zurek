import { Description } from "src/description.interface";
import { Name } from "src/name.interface";
import { Tag } from "src/tags/entities/tag.entity";
import { Tax } from "src/taxes/entities/tax.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

export enum Type {
    SERVICE,
    BARTER,
    PRODUCT
}

export enum Status {
    ACTIVE,
    INACTIVE
}

@Entity()
export class Item {
    @PrimaryGeneratedColumn()
    public id: number

    @Column({ unique: true })
    public internalId: string

    @Column({ type: 'jsonb' })
    public name: Name

    @Column({ type: 'jsonb' })
    public description: Description

    @ManyToMany(() => Tag, { eager: true, cascade: true })
    @JoinTable()
    public tags: Tag[]

    @Column({ type: 'decimal' })
    public price: number

    @OneToOne(() => Tax, { eager: true, cascade: true })
    @JoinColumn()
    public tax: Tax

    @Column({ type: 'int' })
    public type: Type

    @Column()
    public source: string

    @Column()
    public referenceId: string

    @Column({ type: 'int', default: Status.INACTIVE })
    public status: Status

    @Column({ type: 'jsonb' })
    public unit: Name
}
