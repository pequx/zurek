import { HelperService } from '@app/helper';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from 'src/message.interface';
import { Repository } from 'typeorm';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { Invoice } from './entities/invoice.entity';

@Injectable()
export class InvoicesService {
  constructor(
    @InjectRepository(Invoice) private invoicesRespository: Repository<Invoice>,
    @Inject(HelperService) private helperService: HelperService
  ) { }

  public async create(dto: CreateInvoiceDto): Promise<Invoice | Message> {
    return this.helperService.getCreatePromise(this.invoicesRespository, dto)
  }

  public async findAll(): Promise<Invoice[] | Message> {
    return this.helperService.getFindAllPromise(this.invoicesRespository)
  }

  public async findOne(id: number): Promise<Invoice | Message> {
    return this.helperService.getFindOnePromise(this.invoicesRespository, id)
  }

  public async update(id: number, dto: UpdateInvoiceDto) {
    return this.helperService.getUpdatePromise(this.invoicesRespository, id, dto)
  }

  public async remove(id: number): Promise<Invoice | Message> {
    return this.helperService.getRemovePromise(this.invoicesRespository, id)
  }
}
