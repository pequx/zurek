import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';


@Controller({ version: '1', path: 'customers' })
export class CustomersController {
  constructor(private readonly customersService: CustomersService) { }

  @Post()
  public async create(@Body() dto: CreateCustomerDto) {
    return this.customersService.create(dto);
  }

  @Get()
  public async findAll() {
    return this.customersService.findAll();
  }

  @Get(':id')
  public async findOne(@Param('id') id: string) {
    return this.customersService.findOne(+id);
  }

  @Patch(':id')
  public async update(@Param('id') id: string, @Body() dto: UpdateCustomerDto) {
    return this.customersService.update(+id, dto);
  }

  @Delete(':id')
  public async remove(@Param('id') id: string) {
    return this.customersService.remove(+id);
  }
}
