import { MessageService } from '@app/message';
import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Document } from 'src/documents/entities/document.entity';
import { Tax } from 'src/taxes/entities/tax.entity';
import { HelperService } from './helper.service';

@Module({
  imports: [
    // TypeOrmModule.forFeature([Tax]),
    // TypeOrmModule.forFeature([Document])
  ],
  providers: [HelperService, MessageService, Logger],
  exports: [HelperService],
})
export class HelperModule {}

// TypeOrmModule.forFeature([Tax])