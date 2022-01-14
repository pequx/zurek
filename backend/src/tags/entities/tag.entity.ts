import { Description } from "src/description.interface";
import { Document } from "src/documents/entities/document.entity";
import { Name } from "src/name.interface";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

export enum Status {
    ACTIVE,
    INACTIVE
}

@Entity()
export class Tag {
    @PrimaryGeneratedColumn()
    public id: number

    @Column()
    public hashtag: string

    @Column({ type: 'int', default: Status.INACTIVE })
    public status: Status

    @Column({ type: 'jsonb' })
    public name: Name

    @Column({ type: 'jsonb' })
    public description: Description

    @ManyToMany(() => Document, (document: Document) => document.tags)
    public documents: Document[]
}
