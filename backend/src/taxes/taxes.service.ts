import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { CreateTaxDto } from './dto/create-tax.dto';
import { UpdateTaxDto } from './dto/update-tax.dto';
import { Tax } from './entities/tax.entity';

@Injectable()
export class TaxesService {
  constructor(
    @InjectRepository(Tax) private taxesRepository: Repository<Tax>, 
  ) {}

  async create(createTaxDto: CreateTaxDto) {
    return 'This action adds a new tax';
  }

  async findAll(): Promise<Tax[]> {
    return this.taxesRepository.find()
  }

  async findOne(id: number): Promise<Tax> {
    return this.taxesRepository.findOne(id)
  }

  async update(id: number, updateTaxDto: UpdateTaxDto) {
    return `This action updates a #${id} tax`;
  }

  async remove(id: number): Promise<void> {
    await this.taxesRepository.delete(id)
  }
}
