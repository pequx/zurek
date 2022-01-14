import { Logger, Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { MessageService } from '@app/message';
import { HelperService } from '@app/helper';
import { ItemsSubscriber } from './items.subscriber';

@Module({
  imports: [TypeOrmModule.forFeature([Item])],
  controllers: [ItemsController],
  providers: [Logger, MessageService, HelperService, ItemsService, ItemsSubscriber]
})
export class ItemsModule { }
