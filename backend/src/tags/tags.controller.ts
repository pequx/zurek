import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';

@Controller({ version: '1', path: 'tags' })
export class TagsController {
  constructor(private readonly tagsService: TagsService) { }

  @Post()
  public async create(@Body() dto: CreateTagDto) {
    return this.tagsService.create(dto);
  }

  @Get()
  public async findAll() {
    return this.tagsService.findAll();
  }

  @Get(':id')
  public async findOne(@Param('id') id: string) {
    return this.tagsService.findOne(+id);
  }

  @Patch(':id')
  public async update(@Param('id') id: string, @Body() dto: UpdateTagDto) {
    return this.tagsService.update(+id, dto);
  }

  @Delete(':id')
  public async remove(@Param('id') id: string) {
    return this.tagsService.remove(+id);
  }
}
