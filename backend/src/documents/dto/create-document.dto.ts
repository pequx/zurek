import { Description } from "src/description.interface"
import { Name } from "src/name.interface"
import { Tag } from "src/tags/entities/tag.entity"
import { Content, Note, Type } from "../entities/document.entity"

export class CreateDocumentDto {
    internalId?: string
    name: Name
    description?: Description
    type: Type
    content?: Content
    tags?: Tag[]
    notes?: Note[]
    attachments?: string
}
