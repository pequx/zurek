import { Inject, Logger } from '@nestjs/common';
import {
    Connection,
    EntitySubscriberInterface,
    EventSubscriber,
    InsertEvent,
} from 'typeorm';
import { Item } from './entities/item.entity';

@EventSubscriber()
export class ItemsSubscriber implements EntitySubscriberInterface<Item> {
    constructor(
        connection: Connection,
        @Inject(Logger) private logger: Logger
    ) {
        connection.subscribers.push(this);
    }

    public listenTo() {
        return Item;
    }

    public beforeInsert(event: InsertEvent<Item>) {
        this.logger.debug(`BEFORE ITEM INSERTED: `, event.entity);
    }
}