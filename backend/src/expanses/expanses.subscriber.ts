import { Inject, Logger } from '@nestjs/common';
import {
    Connection,
    EntitySubscriberInterface,
    EventSubscriber,
    InsertEvent,
} from 'typeorm';
import { Expanse } from './entities/expanse.entity';

@EventSubscriber()
export class ExpansesSubscriber implements EntitySubscriberInterface<Expanse> {
    constructor(
        connection: Connection,
        @Inject(Logger) private logger: Logger
    ) {
        connection.subscribers.push(this);
    }

    listenTo() {
        return Expanse;
    }

    beforeInsert(event: InsertEvent<Expanse>) {
        this.logger.debug(`BEFORE EXPANSE INSERTED: `, event.entity);
    }
}