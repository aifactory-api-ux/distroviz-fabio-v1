import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KPIController } from './kpi.controller';
import { KPIService } from './kpi.service';

@Module({
  imports: [TypeOrmModule.forFeature([], 'Order')],
  controllers: [KPIController],
  providers: [KPIService],
  exports: [KPIService],
})
export class KPIModule {}