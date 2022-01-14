import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Controller({ version: '1', path: 'items' })
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) { }

  @Post()
  public async create(@Body() dto: CreateItemDto) {
    return this.itemsService.create(dto);
  }

  @Get()
  public async findAll() {
    return this.itemsService.findAll();
  }

  @Get(':id')
  public async findOne(@Param('id') id: string) {
    return this.itemsService.findOne(+id);
  }

  @Patch(':id')
  public async update(@Param('id') id: string, @Body() dto: UpdateItemDto) {
    return this.itemsService.update(+id, dto);
  }

  @Delete(':id')
  public async remove(@Param('id') id: string) {
    return this.itemsService.remove(+id);
  }
}
