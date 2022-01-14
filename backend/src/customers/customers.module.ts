import { Logger, Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { MessageService } from '@app/message';
import { HelperService } from '@app/helper';
import { CustomersSubscriber } from './customers.subscriber';

@Module({
  imports: [TypeOrmModule.forFeature([Customer])],
  controllers: [CustomersController],
  providers: [Logger, MessageService, HelperService, CustomersService, CustomersSubscriber]
})
export class CustomersModule { }
