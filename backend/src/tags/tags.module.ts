import { Logger, Module } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from './entities/tag.entity';
import { MessageService } from '@app/message';
import { HelperService } from '@app/helper';
import { TagsSubscriber } from './tags.subscriber';

@Module({
  imports: [TypeOrmModule.forFeature([Tag])],
  controllers: [TagsController],
  providers: [Logger, MessageService, HelperService, TagsService, TagsSubscriber]
})
export class TagsModule { }
