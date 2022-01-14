import { Inject, Logger } from '@nestjs/common';
import {
    Connection,
    EntitySubscriberInterface,
    EventSubscriber,
    InsertEvent,
} from 'typeorm';
import { Invoice } from './entities/invoice.entity';

@EventSubscriber()
export class InvoicesSubscriber implements EntitySubscriberInterface<Invoice> {
    constructor(
        connection: Connection,
        @Inject(Logger) private logger: Logger
    ) {
        connection.subscribers.push(this);
    }

    listenTo() {
        return Invoice;
    }

    beforeInsert(event: InsertEvent<Invoice>) {
        this.logger.debug(`BEFORE INVOICE INSERTED: `, event.entity);
    }
}