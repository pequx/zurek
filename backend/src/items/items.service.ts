import { HelperService } from '@app/helper';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from 'src/message.interface';
import { Repository } from 'typeorm';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './entities/item.entity';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item) private itemsRepository: Repository<Item>,
    @Inject(HelperService) private helperService: HelperService
  ) { }

  public async create(dto: CreateItemDto): Promise<Item | Message> {
    return this.helperService.getCreatePromise(this.itemsRepository, dto)
  }

  public async findAll(): Promise<Item[] | Message> {
    return this.helperService.getFindAllPromise(this.itemsRepository)
  }

  public async findOne(id: number): Promise<Item | Message> {
    return this.helperService.getFindOnePromise(this.itemsRepository, id)
  }

  public async update(id: number, dto: UpdateItemDto): Promise<Item | Message> {
    return this.helperService.getUpdatePromise(this.itemsRepository, id, dto)
  }

  public async remove(id: number): Promise<Item | Message> {
    return this.helperService.getRemovePromise(this.itemsRepository, id)
  }
}
