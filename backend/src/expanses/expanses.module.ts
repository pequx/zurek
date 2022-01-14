import { Logger, Module } from '@nestjs/common';
import { ExpansesService } from './expanses.service';
import { ExpansesController } from './expanses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Expanse } from './entities/expanse.entity';
import { MessageService } from '@app/message';
import { HelperService } from '@app/helper';
import { ExpansesSubscriber } from './expanses.subscriber';

@Module({
  imports: [TypeOrmModule.forFeature([Expanse])],
  controllers: [ExpansesController],
  providers: [Logger, MessageService, HelperService, ExpansesService, ExpansesSubscriber]
})
export class ExpansesModule { }
