import { Inject, Logger } from '@nestjs/common';
import {
    Connection,
    EntitySubscriberInterface,
    EventSubscriber,
    InsertEvent,
} from 'typeorm';
import { Document } from './entities/document.entity';

@EventSubscriber()
export class DocumentsSubscriber implements EntitySubscriberInterface<Document> {
    constructor(
        connection: Connection,
        @Inject(Logger) private logger: Logger
    ) {
        connection.subscribers.push(this);
    }

    listenTo() {
        return Document;
    }

    beforeInsert(event: InsertEvent<Document>) {
        this.logger.debug(`BEFORE DOCUMENT INSERTED: ${JSON.stringify(event.entity)}`);
    }
}