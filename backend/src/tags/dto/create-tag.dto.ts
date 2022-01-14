import { Description } from "src/description.interface"
import { Name } from "src/name.interface"
import { Status } from "../entities/tag.entity"

export class CreateTagDto {
    hashtag: string
    status?: Status
    name?: Name
    description?: Description
}
