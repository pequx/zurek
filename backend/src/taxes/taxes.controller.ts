import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { TaxesService } from './taxes.service';
import { CreateTaxDto } from './dto/create-tax.dto';
import { UpdateTaxDto } from './dto/update-tax.dto';
import { Tax } from './entities/tax.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { resolve } from 'path/posix';
import { rejects } from 'assert';

@Controller({ version: '1', path: 'taxes' })
export class TaxesControllerV1 {
  constructor(private readonly taxesService: TaxesService) {}

  @Post()
  async create(@Body() dto: CreateTaxDto): Promise<Tax> {
    return this.taxesService.create(dto);
  }

  @Get()
  async findAll(): Promise<Tax[]> {
    return this.taxesService.findAll();
  } 

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Tax> {
    const result:Tax = await this.taxesService.findOne(+id)
    return new Promise((resolve, reject) => {
      if (result) resolve(result)
      reject({ message: "eee" })
    })
  }

  @Patch(':id') 
  async update(@Param('id') id: string, @Body() dto: UpdateTaxDto): Promise<UpdateResult>{
    return this.taxesService.update(+id, dto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.taxesService.remove(+id);
  }
}
