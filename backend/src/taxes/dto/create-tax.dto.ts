import { Description } from 'src/description.interface'
import { Tag } from 'src/tags/entities/tag.entity'
import { Name } from '../../name.interface'
import { Status } from '../entities/tax.entity'


export class CreateTaxDto {
    internalId?: string
    name: Name
    description?: Description
    tags?: Tag[]
    value: number
    status?: Status
}
