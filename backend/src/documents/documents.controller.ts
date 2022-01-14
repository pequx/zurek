import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';

@Controller({ version: '1', path: 'documents' })
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) { }

  @Post()
  public async create(@Body() dto: CreateDocumentDto) {
    return this.documentsService.create(dto);
  }

  @Get()
  public async findAll() {
    return this.documentsService.findAll();
  }

  @Get(':id')
  public async findOne(@Param('id') id: string) {
    return this.documentsService.findOne(+id);
  }

  @Patch(':id')
  public async update(@Param('id') id: string, @Body() dto: UpdateDocumentDto) {
    return this.documentsService.update(+id, dto);
  }

  @Delete(':id')
  public async remove(@Param('id') id: string) {
    return this.documentsService.remove(+id);
  }
}
