import { MessageService } from '@app/message';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDocumentDto } from 'src/documents/dto/create-document.dto';
import { Document } from 'src/documents/entities/document.entity';
import { Message } from 'src/message.interface';
import { Name } from 'src/name.interface';
import { CreateTaxDto } from 'src/taxes/dto/create-tax.dto';
import { Tax } from 'src/taxes/entities/tax.entity';
import { Repository } from 'typeorm';

type Entity = Tax | Document
type Dto = CreateTaxDto | CreateDocumentDto

@Injectable()
export class HelperService {
    constructor(
        @Inject(MessageService) private messageService: MessageService,
        @Inject(Logger) private logger: Logger
    ) {}

    public getCreatePromise = (repository: Repository<Entity> , dto: Dto): Promise<any> => 
        new Promise(async (resolve, reject) => {
            try {            
                let result = null

                const entity = repository.create(dto)
                result = await repository.save(entity)
                
                if (result) resolve(result)
                resolve(this.messageService.message.REPOSITORY_SAVE_ERROR)
            } catch (e) {
                resolve(this.messageService.getRuntimeError(e))
            }
        })
    
    public getFindAllPromise = (repository:Repository<Entity>):Promise<any> => 
        new Promise(async (resolve, reject) => {
            try {
                const entities = await repository.find()
        
                if (entities) resolve(entities)
                resolve(this.messageService.message.REPOSITORY_FIND_ERROR)
            } catch (e) {
                resolve(this.messageService.getRuntimeError(e))
            }
        })

    public getFindOnePromise = (repository:Repository<Entity>, id: number):Promise<any> => 
        new Promise(async (resolve, reject) => {
            try {
                const entity = await repository.findOne(id) 
        
                if (entity) resolve(entity)
                resolve(this.messageService.message.ENTITY_NOT_FOUND)
            } catch (e) {
                resolve(this.messageService.getRuntimeError(e))
            }
        })

    public getUpdatePromise = (repository:Repository<Entity>, id: number, dto: Dto): Promise<any> => 
        new Promise(async (resolve, reject) => {
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

    public getRemovePromise = (repository:Repository<Entity>, id: number): Promise<any> => 
        new Promise(async (resolve, reject) => {
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
