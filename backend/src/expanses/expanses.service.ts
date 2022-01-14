import { HelperService } from '@app/helper';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from 'src/message.interface';
import { Repository } from 'typeorm';
import { CreateExpanseDto } from './dto/create-expanse.dto';
import { UpdateExpanseDto } from './dto/update-expanse.dto';
import { Expanse } from './entities/expanse.entity';

@Injectable()
export class ExpansesService {
  constructor(
    @InjectRepository(Expanse) private expansesRepository: Repository<Expanse>,
    @Inject(HelperService) private helperService: HelperService
  ) { }

  public async create(dto: CreateExpanseDto): Promise<Expanse | Message> {
    return this.helperService.getCreatePromise(this.expansesRepository, dto)
  }

  public async findAll(): Promise<Expanse[] | Message> {
    return this.helperService.getFindAllPromise(this.expansesRepository)
  }

  public async findOne(id: number): Promise<Expanse | Message> {
    return this.helperService.getFindOnePromise(this.expansesRepository, id)
  }

  public async update(id: number, dto: UpdateExpanseDto): Promise<Expanse | Message> {
    return this.helperService.getUpdatePromise(this.expansesRepository, id, dto)
  }

  public async remove(id: number): Promise<Expanse | Message> {
    return this.helperService.getRemovePromise(this.expansesRepository, id)
  }
}
