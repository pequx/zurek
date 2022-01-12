import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Name } from '../../name.interface'

@Entity()
export class Tax {
    @PrimaryGeneratedColumn()
    public id: number

    @Column({
        type: 'jsonb'
    })
    public name: Name

    @Column()
    public value: number

    @Column()
    public isActive: boolean
}
