import { Inject, Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { Connection, DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateTaxDto } from './dto/create-tax.dto';
import { UpdateTaxDto } from './dto/update-tax.dto';
import { Tax } from './entities/tax.entity';
import { Name } from '../name.interface'
import { Message, Messages } from 'src/message.interface';
import { messages } from '../../src/messages'
import { HelperService } from '@app/helper';

@Injectable()
export class TaxesService {
  constructor(
    @InjectRepository(Tax) private taxesRepository: Repository<Tax>,
    @Inject(HelperService) private helperService: HelperService,
  ) {}

  public async create(dto: CreateTaxDto): Promise<Tax|Message> {
    return this.helperService.getCreatePromise(this.taxesRepository, dto)
  }

  public async findAll(): Promise<Tax[]|Message> {
    return this.helperService.getFindAllPromise(this.taxesRepository)
  }

  public async findOne(id: number): Promise<Tax|Message> {
    return this.helperService.getFindOnePromise(this.taxesRepository, id)
  }

  public async update(id: number, dto: UpdateTaxDto): Promise<Tax|Message> {
    return this.helperService.getUpdatePromise(this.taxesRepository, id, dto)
  }

  public async remove(id: number): Promise<Tax|Message> {
    return this.helperService.getRemovePromise(this.taxesRepository, id)
  }
}
