import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderEntity } from '../database/entities/order.entity';
import { DashboardMetrics } from './dto/dashboard-metrics.dto';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(OrderEntity)
    private ordersRepository: Repository<OrderEntity>,
  ) {}

  async getMetrics(): Promise<DashboardMetrics> {
    const orders = await this.ordersRepository.find();

    const total_orders = orders.length;
    const pending_orders = orders.filter(o => o.status === 'pending').length;
    const dispatched_orders = orders.filter(o => o.status === 'dispatched').length;
    const delivered_orders = orders.filter(o => o.status === 'delivered').length;

    const orders_by_plant: Record<string, number> = {};
    const orders_by_distribution_center: Record<string, number> = {};

    orders.forEach(order => {
      orders_by_plant[order.plant] = (orders_by_plant[order.plant] || 0) + 1;
      orders_by_distribution_center[order.distribution_center] = (orders_by_distribution_center[order.distribution_center] || 0) + 1;
    });

    return {
      total_orders,
      pending_orders,
      dispatched_orders,
      delivered_orders,
      orders_by_plant,
      orders_by_distribution_center,
    };
  }
}