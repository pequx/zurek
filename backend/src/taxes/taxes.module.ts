import { Module } from '@nestjs/common';
import { TaxesService } from './taxes.service';
import { TaxesControllerV1 } from './taxes.controller';
import { TaxSubscriber } from './taxes.subscriber';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tax } from './entities/tax.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tax])],
  controllers: [TaxesControllerV1], 
  providers: [TaxesService, TaxSubscriber]
})
export class TaxesModule {}
