import { Logger, Module } from '@nestjs/common';
import { MessageService } from './message.service';

@Module({
  providers: [Logger, MessageService],
  exports: [MessageService],
})
export class MessageModule {}
