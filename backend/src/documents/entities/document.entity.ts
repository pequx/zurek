import { Description } from "src/description.interface";
import { Name } from "src/name.interface";
import { Tag } from "src/tags/entities/tag.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

export enum Type {
    INVOICE,
    EXPENSE,
    LETTER,
    LEGAL,
    INSURANCE,
    NOTE,
    OTHER
}

export type Content = any

export interface Note {
    name: Name
    description: Description
}

@Entity()
export class Document {
    @PrimaryGeneratedColumn()
    public id: number

    @Column({ unique: true })
    public internalId: string

    @Column({ type: 'jsonb' })
    public name: Name

    @Column({ type: 'jsonb' })
    public description: Description

    @Column({ type: 'int', default: Type.NOTE })
    public type: Type

    @Column({ type: 'jsonb' })
    public content: Content

    @ManyToMany(() => Tag, (tag: Tag) => tag.documents)
    @JoinTable()
    public tags: Tag[]

    @Column({ type: 'jsonb' })
    public notes: Note[]

    @Column({ type: 'jsonb' })
    public attachments: string[]
}
