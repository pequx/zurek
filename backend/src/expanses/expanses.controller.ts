import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ExpansesService } from './expanses.service';
import { CreateExpanseDto } from './dto/create-expanse.dto';
import { UpdateExpanseDto } from './dto/update-expanse.dto';

@Controller({ version: '1', path: 'expanses' })
export class ExpansesController {
  constructor(private readonly expansesService: ExpansesService) { }

  @Post()
  public async create(@Body() dto: CreateExpanseDto) {
    return this.expansesService.create(dto);
  }

  @Get()
  public async findAll() {
    return this.expansesService.findAll();
  }

  @Get(':id')
  public async findOne(@Param('id') id: string) {
    return this.expansesService.findOne(+id);
  }

  @Patch(':id')
  public async update(@Param('id') id: string, @Body() dto: UpdateExpanseDto) {
    return this.expansesService.update(+id, dto);
  }

  @Delete(':id')
  public async remove(@Param('id') id: string) {
    return this.expansesService.remove(+id);
  }
}
