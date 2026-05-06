import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { RedisModule } from './redis/redis.module';
import { KPIModule } from './kpi/kpi.module';

@Module({
  imports: [DatabaseModule, RedisModule, KPIModule],
})
export class AppModule {}