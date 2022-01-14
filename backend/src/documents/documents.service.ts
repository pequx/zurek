import { HelperService } from '@app/helper';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from 'src/message.interface';
import { Repository } from 'typeorm';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { Document } from './entities/document.entity';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectRepository(Document) private documentsRepository: Repository<Document>,
    @Inject(HelperService) private helperService: HelperService
  ) { }

  public async create(dto: CreateDocumentDto): Promise<Document | Message> {
    return this.helperService.getCreatePromise(this.documentsRepository, dto, { relations: ['tags'] })
  }

  public async findAll(): Promise<Document[] | Message> {
    return this.helperService.getFindAllPromise(this.documentsRepository, { relations: ['tags'] })
  }

  public async findOne(id: number): Promise<Document | Message> {
    return this.helperService.getFindOnePromise(this.documentsRepository, id)
  }

  public async update(id: number, dto: UpdateDocumentDto): Promise<Document | Message> {
    return this.helperService.getUpdatePromise(this.documentsRepository, id, dto)
  }

  public async remove(id: number): Promise<Document | Message> {
    return this.helperService.getRemovePromise(this.documentsRepository, id)
  }
}
