import {
    Connection,
    EntitySubscriberInterface,
    EventSubscriber,
    InsertEvent,
  } from 'typeorm';
  import { Tax } from './entities/tax.entity';
  
  @EventSubscriber()
  export class TaxSubscriber implements EntitySubscriberInterface<Tax> {
    constructor(connection: Connection) {
      connection.subscribers.push(this);
    }
  
    listenTo() {
      return Tax;
    }
  
    beforeInsert(event: InsertEvent<Tax>) {
      console.log(`BEFORE TAX INSERTED: `, event.entity);
    }
  }