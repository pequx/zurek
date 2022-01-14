import { Logger, Module } from '@nestjs/common';
import { TaxesService } from './taxes.service';
import { TaxesControllerV1 } from './taxes.controller';
import { TaxesSubscriber } from './taxes.subscriber';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tax } from './entities/tax.entity';
import { HelperService } from '@app/helper';
import { MessageService } from '@app/message';

@Module({
  imports: [TypeOrmModule.forFeature([Tax])],
  controllers: [TaxesControllerV1],
  providers: [Logger, MessageService, HelperService, TaxesService, TaxesSubscriber]
})
export class TaxesModule { }
