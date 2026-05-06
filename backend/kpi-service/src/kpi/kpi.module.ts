import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KPIController } from './kpi.controller';
import { KPIService } from './kpi.service';
import { Order } from '../orders/entities/order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order])],
  controllers: [KPIController],
  providers: [KPIService],
  exports: [KPIService],
})
export class KPIModule {}