import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { RedisModule } from './redis/redis.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [DatabaseModule, RedisModule, OrdersModule],
})
export class AppModule {}