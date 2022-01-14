import { HelperService } from '@app/helper';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from 'src/message.interface';
import { Repository } from 'typeorm';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './entities/customer.entity';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer) private customersRepository: Repository<Customer>,
    @Inject(HelperService) private helperService: HelperService
  ) { }

  public async create(dto: CreateCustomerDto): Promise<Customer | Message> {
    return this.helperService.getCreatePromise(this.customersRepository, dto)
  }

  public async findAll(): Promise<Customer[] | Message> {
    return this.helperService.getFindAllPromise(this.customersRepository, { relations: ['tag'] })
  }

  public async findOne(id: number): Promise<Customer | Message> {
    return this.helperService.getFindOnePromise(this.customersRepository, id)
  }

  public async update(id: number, dto: UpdateCustomerDto): Promise<Customer | Message> {
    return this.helperService.getUpdatePromise(this.customersRepository, id, dto)
  }

  public async remove(id: number): Promise<Customer | Message> {
    return this.helperService.getRemovePromise(this.customersRepository, id)
  }
}
