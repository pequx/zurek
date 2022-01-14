import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaxDto } from './dto/create-tax.dto';
import { UpdateTaxDto } from './dto/update-tax.dto';
import { Tax } from './entities/tax.entity';
import { Message } from 'src/message.interface';
import { HelperService } from '@app/helper';

@Injectable()
export class TaxesService {
  constructor(
    @InjectRepository(Tax) private taxesRepository: Repository<Tax>,
    @Inject(HelperService) private helperService: HelperService,
  ) { }

  public async create(dto: CreateTaxDto): Promise<Tax | Message> {
    return this.helperService.getCreatePromise(this.taxesRepository, dto)
  }

  public async findAll(): Promise<Tax[] | Message> {
    return this.helperService.getFindAllPromise(this.taxesRepository)
  }

  public async findOne(id: number): Promise<Tax | Message> {
    return this.helperService.getFindOnePromise(this.taxesRepository, id)
  }

  public async update(id: number, dto: UpdateTaxDto): Promise<Tax | Message> {
    return this.helperService.getUpdatePromise(this.taxesRepository, id, dto)
  }

  public async remove(id: number): Promise<Tax | Message> {
    return this.helperService.getRemovePromise(this.taxesRepository, id)
  }
}
