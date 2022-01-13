import { Logger, Module } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { DocumentsController } from './documents.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Document } from './entities/document.entity';
import { HelperService } from '@app/helper';
import { MessageService } from '@app/message';
import { Tax } from 'src/taxes/entities/tax.entity';

@Module({
  imports: [
    // TypeOrmModule.forFeature([Tax]),
    TypeOrmModule.forFeature([Document])
  ],
  controllers: [DocumentsController],
  providers: [Logger, DocumentsService, MessageService, HelperService]
})
export class DocumentsModule {}
