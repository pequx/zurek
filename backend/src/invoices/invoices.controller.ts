import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';

@Controller({ version: '1', path: 'invoices' })
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) { }

  @Post()
  public async create(@Body() createInvoiceDto: CreateInvoiceDto) {
    return this.invoicesService.create(createInvoiceDto);
  }

  @Get()
  public async findAll() {
    return this.invoicesService.findAll();
  }

  @Get(':id')
  public async findOne(@Param('id') id: string) {
    return this.invoicesService.findOne(+id);
  }

  @Patch(':id')
  public async update(@Param('id') id: string, @Body() updateInvoiceDto: UpdateInvoiceDto) {
    return this.invoicesService.update(+id, updateInvoiceDto);
  }

  @Delete(':id')
  public async remove(@Param('id') id: string) {
    return this.invoicesService.remove(+id);
  }
}
