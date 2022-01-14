import { Inject, Logger } from '@nestjs/common';
import {
    Connection,
    EntitySubscriberInterface,
    EventSubscriber,
    InsertEvent,
} from 'typeorm';
import { Tag } from './entities/tag.entity';

@EventSubscriber()
export class TagsSubscriber implements EntitySubscriberInterface<Tag> {
    constructor(
        connection: Connection,
        @Inject(Logger) private logger: Logger
    ) {
        connection.subscribers.push(this);
    }

    listenTo() {
        return Tag;
    }

    beforeInsert(event: InsertEvent<Tag>) {
        this.logger.debug(`BEFORE TAG INSERTED: `, event.entity);
    }
}