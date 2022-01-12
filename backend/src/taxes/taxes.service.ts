import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { Connection, DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateTaxDto } from './dto/create-tax.dto';
import { UpdateTaxDto } from './dto/update-tax.dto';
import { Tax } from './entities/tax.entity';
import { Name } from '../name.interface'

@Injectable()
export class TaxesService {
  constructor(
    @InjectRepository(Tax) private taxesRepository: Repository<Tax>, 
  ) {}

  // async create(createTaxDtos: CreateTaxDto[]): Promise<Tax[]> {
  //   const results = []

  //   createTaxDtos.forEach((dto: CreateTaxDto, index: number) => {
  //     const tax = new Tax()
  //     tax.name = {
  //       en: dto.name.en,
  //       pl: dto.name.pl,
  //       de: dto.name.de || null
  //     } as Name
  //     tax.value = dto.value
  //     tax.isActive = dto.isActive

  //     // results.push(tax)
  //     results.push(this.taxesRepository.save(tax))
  //   })
    
  //   return results
  // }

  async create(dto: CreateTaxDto): Promise<Tax> {
      const tax = new Tax()
      tax.name = {
        en: dto.name.en,
        pl: dto.name.pl,
        de: dto.name.de || ""
      } as Name
      tax.value = dto.value
      tax.isActive = dto.isActive

      const result:Promise<Tax> = this.taxesRepository.save(tax)
      
      return result
  }

  async findAll(): Promise<Tax[]> {
    return this.taxesRepository.find()
  }

  async findOne(id: number): Promise<Tax|undefined> {
    return this.taxesRepository.findOne(id) 
  }

  async update(id: number, dto: UpdateTaxDto): Promise<UpdateResult> {
    return this.taxesRepository.update(id, dto)
  }

  async remove(id: number): Promise<DeleteResult> {
    return this.taxesRepository.delete(id)
  }
}
