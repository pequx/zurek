import { Description } from "src/description.interface";
import { Tag } from "src/tags/entities/tag.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Name } from '../../name.interface'


export enum Status {
    ACTIVE,
    INACTIVE
}


@Entity()
export class Tax {
    @PrimaryGeneratedColumn()
    public id: number

    @Column({ unique: true })
    public internalId: string

    @Column({ type: 'jsonb' })
    public name: Name

    @Column({ type: 'jsonb' })
    public description: Description

    @ManyToMany(() => Tag)
    @JoinTable()
    public tags: Tag[]

    @Column({ type: 'decimal' })
    public value: number

    @Column({ type: 'int', default: Status.INACTIVE })
    public status: Status
}
