import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Tax {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    value: number

    @Column()
    isActive: boolean
}
