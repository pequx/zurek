import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { TaxesService } from './taxes.service';
import { CreateTaxDto } from './dto/create-tax.dto';
import { UpdateTaxDto } from './dto/update-tax.dto';
import { Tax } from './entities/tax.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { resolve } from 'path/posix';
import { rejects } from 'assert';
import { messages } from 'src/messages';
import { Message } from 'src/message.interface';

@Controller({ version: '1', path: 'taxes' })
export class TaxesControllerV1 {
  constructor(private readonly taxesService: TaxesService) {}

  @Post()
  public create(@Body() dto: CreateTaxDto) {
    return this.taxesService.create(dto)
  }

  @Get()
  public async findAll() {
    return this.taxesService.findAll();
  } 

  @Get(':id')
  public async findOne(@Param('id') id: string) {
    return this.taxesService.findOne(+id)
  }

  @Patch(':id') 
  public async update(@Param('id') id: string, @Body() dto: UpdateTaxDto) {
    return this.taxesService.update(+id, dto);
  }

  @Delete(':id')
  public async remove(@Param('id') id: string) {
    return this.taxesService.remove(+id);
  }
}
