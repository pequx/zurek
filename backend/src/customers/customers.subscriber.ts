import { Inject, Logger } from '@nestjs/common';
import {
    Connection,
    EntitySubscriberInterface,
    EventSubscriber,
    InsertEvent,
} from 'typeorm';
import { Customer } from './entities/customer.entity';

@EventSubscriber()
export class CustomersSubscriber implements EntitySubscriberInterface<Customer> {
    constructor(
        connection: Connection,
        @Inject(Logger) private logger: Logger
    ) {
        connection.subscribers.push(this);
    }

    listenTo() {
        return Customer;
    }

    beforeInsert(event: InsertEvent<Customer>) {
        this.logger.debug(`BEFORE CUSTOMER INSERTED: `, event.entity);
    }
}