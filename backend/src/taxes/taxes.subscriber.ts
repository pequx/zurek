import { Inject, Logger } from '@nestjs/common';
import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import { Tax } from './entities/tax.entity';

@EventSubscriber()
export class TaxesSubscriber implements EntitySubscriberInterface<Tax> {
  constructor(
    connection: Connection,
    @Inject(Logger) private logger: Logger
  ) {
    connection.subscribers.push(this);
  }

  public listenTo() {
    return Tax;
  }

  public beforeInsert(event: InsertEvent<Tax>) {
    this.logger.debug(`BEFORE TAX INSERTED: `, event.entity);
  }
}