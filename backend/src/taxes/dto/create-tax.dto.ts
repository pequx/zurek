import { Name } from '../../name.interface'

export class CreateTaxDto {
    name: Name
    value: number
    isActive: boolean
}
