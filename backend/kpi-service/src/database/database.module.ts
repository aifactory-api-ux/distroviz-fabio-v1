import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../orders/entities/order.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.POSTGRES_HOST || 'localhost',
        port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
        username: process.env.POSTGRES_USER || 'distroviz',
        password: process.env.POSTGRES_PASSWORD || 'secret',
        database: process.env.POSTGRES_DB || 'distroviz_db',
        entities: [Order],
        synchronize: false,
        logging: false,
      }),
    }),
  ],
})
export class DatabaseModule {}