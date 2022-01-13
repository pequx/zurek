import { Content } from "src/content.interface";
import { Name } from "src/name.interface";
import { Type } from "src/type.interface";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Document {
    @PrimaryGeneratedColumn()
    public id: number

    @Column({
        type: 'jsonb'
    })
    public name: Name

    @Column({
        type: 'int'
    })
    public type: Type

    @Column({
        type: 'jsonb'
    })
    public content: Content
}
