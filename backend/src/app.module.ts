import { CacheInterceptor, CacheModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { createConnection, getConnectionOptions } from 'typeorm';
import { TaxesModule } from './taxes/taxes.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { DocumentsModule } from './documents/documents.module';
import { HelperModule } from '@app/helper';
import { InvoicesModule } from './invoices/invoices.module';
import { CustomersModule } from './customers/customers.module';
import { ItemsModule } from './items/items.module';
import { ExpansesModule } from './expanses/expanses.module';
import { TagsModule } from './tags/tags.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: true
    }),
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        store: redisStore,
        host: configService.get('REDIS_HOST'),
        port: configService.get<number>('REDIS_PORT'),
        ttl: configService.get<number>('REDIS_TTL'),
        password: configService.get('REDIS_PASSWORD')
      })
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        Object.assign(await getConnectionOptions(), {
          autoLoadEntities: true,
          synchronize: true,
          type: configService.get('DB_TYPE'),
          host: configService.get('DB_HOST'),
          port: configService.get<number>('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_NAME')
        }),
      connectionFactory: async (options) => {
        const connection = await createConnection(options);
        return connection;
      },
    }),
    HelperModule,
    TaxesModule,
    DocumentsModule,
    InvoicesModule,
    CustomersModule,
    ItemsModule,
    ExpansesModule,
    TagsModule
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor
    },
    AppService
  ],
})
export class AppModule { }
