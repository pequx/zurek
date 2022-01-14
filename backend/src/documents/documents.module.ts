import { Logger, Module } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { DocumentsController } from './documents.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Document } from './entities/document.entity';
import { HelperService } from '@app/helper';
import { MessageService } from '@app/message';
import { DocumentsSubscriber } from './documents.subscriber';

@Module({
  imports: [TypeOrmModule.forFeature([Document])],
  controllers: [DocumentsController],
  providers: [Logger, MessageService, HelperService, DocumentsService, DocumentsSubscriber]
})
export class DocumentsModule { }
