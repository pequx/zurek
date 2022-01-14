import { Logger, Module } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { InvoicesController } from './invoices.controller';
import { MessageService } from '@app/message';
import { HelperService } from '@app/helper';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invoice } from './entities/invoice.entity';
import { InvoicesSubscriber } from './invoices.subscriber';

@Module({
  imports: [TypeOrmModule.forFeature([Invoice])],
  controllers: [InvoicesController],
  providers: [Logger, MessageService, HelperService, InvoicesService, InvoicesSubscriber]
})
export class InvoicesModule { }
