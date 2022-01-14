import { MessageService } from '@app/message';
import { Inject, Injectable } from '@nestjs/common';
import { CreateCustomerDto } from 'src/customers/dto/create-customer.dto';
import { UpdateCustomerDto } from 'src/customers/dto/update-customer.dto';
import { Customer } from 'src/customers/entities/customer.entity';
import { CreateDocumentDto } from 'src/documents/dto/create-document.dto';
import { UpdateDocumentDto } from 'src/documents/dto/update-document.dto';
import { Document } from 'src/documents/entities/document.entity';
import { CreateExpanseDto } from 'src/expanses/dto/create-expanse.dto';
import { UpdateExpanseDto } from 'src/expanses/dto/update-expanse.dto';
import { Expanse } from 'src/expanses/entities/expanse.entity';
import { CreateInvoiceDto } from 'src/invoices/dto/create-invoice.dto';
import { UpdateInvoiceDto } from 'src/invoices/dto/update-invoice.dto';
import { Invoice } from 'src/invoices/entities/invoice.entity';
import { CreateItemDto } from 'src/items/dto/create-item.dto';
import { UpdateItemDto } from 'src/items/dto/update-item.dto';
import { Item } from 'src/items/entities/item.entity';
import { CreateTagDto } from 'src/tags/dto/create-tag.dto';
import { UpdateTagDto } from 'src/tags/dto/update-tag.dto';
import { Tag } from 'src/tags/entities/tag.entity';
import { CreateTaxDto } from 'src/taxes/dto/create-tax.dto';
import { UpdateTaxDto } from 'src/taxes/dto/update-tax.dto';
import { Tax } from 'src/taxes/entities/tax.entity';
import { Repository } from 'typeorm';

type Entity = Customer | Document | Expanse | Invoice | Item | Tag | Tax
type Dto = CreateCustomerDto | CreateDocumentDto | CreateExpanseDto | CreateInvoiceDto | CreateItemDto | CreateTagDto | CreateTaxDto
type UpdateDto = UpdateCustomerDto | UpdateDocumentDto | UpdateExpanseDto | UpdateInvoiceDto | UpdateItemDto | UpdateTagDto | UpdateTaxDto
type Options = { [name: string]: string | string[] | number | number }


@Injectable()
export class HelperService {
    constructor(
        @Inject(MessageService) private messageService: MessageService
    ) { }

    public getCreatePromise = (repository: Repository<Entity>, dto: Dto, options?: Options): Promise<any> =>
        new Promise(async (resolve) => {
            try {
                let result = null

                const entity = repository.create(dto)
                result = await repository.save(entity, options)

                if (result) resolve(result)
                resolve(this.messageService.message.REPOSITORY_SAVE_ERROR)
            } catch (e) {
                resolve(this.messageService.getRuntimeError(e))
            }
        })

    public getFindAllPromise = (repository: Repository<Entity>, options?: Options): Promise<any> =>
        new Promise(async (resolve) => {
            try {
                const entities = await repository.find(options)

                if (entities) resolve(entities)
                resolve(this.messageService.message.REPOSITORY_FIND_ERROR)
            } catch (e) {
                resolve(this.messageService.getRuntimeError(e))
            }
        })

    public getFindOnePromise = (repository: Repository<Entity>, id: number, options?: Options): Promise<any> =>
        new Promise(async (resolve) => {
            try {
                const entity = await repository.findOne(id, options)

                if (entity) resolve(entity)
                resolve(this.messageService.message.ENTITY_NOT_FOUND)
            } catch (e) {
                resolve(this.messageService.getRuntimeError(e))
            }
        })

    public getUpdatePromise = (repository: Repository<Entity>, id: number, dto: UpdateDto): Promise<any> =>
        new Promise(async (resolve) => {
            try {
                const entity = await repository.findOne(id)
                if (entity) {
                    const result = await repository.update(id, dto)

                    if (result.affected == 1) resolve({ id, ...dto })
                    resolve(this.messageService.message.RESPOSITORY_UPDATE_ERROR)
                }
                resolve(this.messageService.message.ENTITY_NOT_FOUND)
            } catch (e) {
                resolve(this.messageService.getRuntimeError(e))
            }
        })

    public getRemovePromise = (repository: Repository<Entity>, id: number): Promise<any> =>
        new Promise(async (resolve) => {
            try {
                const entity = await repository.findOne(id)

                if (entity) {
                    const result = await repository.delete(id)

                    if (result.affected == 1) resolve({ id, ...entity })
                    resolve(this.messageService.message.RESPOSITORY_DELETE_ERROR)
                }
                resolve(this.messageService.message.ENTITY_NOT_FOUND)
            } catch (e) {
                resolve(this.messageService.getRuntimeError(e))
            }
        })
}
