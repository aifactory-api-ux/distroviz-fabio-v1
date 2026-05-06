import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

interface OrderStatusCount {
  status: string;
  count: number;
}

@Injectable()
export class KPIService {
  constructor(
    @InjectRepository('Order')
    private readonly orderRepository: Repository<any>,
  ) {}

  async getKPI(): Promise<{
    totalOrders: number;
    deliveredOrders: number;
    pendingOrders: number;
    cancelledOrders: number;
    inTransitOrders: number;
    averageDeliveryTimeMinutes: number;
  }> {
    const statusCounts = await this.orderRepository
      .createQueryBuilder('order')
      .select('order.status', 'status')
      .addSelect('COUNT(*)', 'count')
      .groupBy('order.status')
      .getRawMany();

    const countMap: Record<string, number> = {};
    let totalOrders = 0;
    for (const row of statusCounts) {
      countMap[row.status] = parseInt(row.count, 10);
      totalOrders += parseInt(row.count, 10);
    }

    const pendingOrders = countMap['pending'] || 0;
    const inTransitOrders = countMap['in_transit'] || 0;
    const deliveredOrders = countMap['delivered'] || 0;
    const cancelledOrders = countMap['cancelled'] || 0;

    let averageDeliveryTimeMinutes = 0;
    if (deliveredOrders > 0) {
      const deliveredOrdersData = await this.orderRepository.find({
        where: { status: 'delivered' },
        select: ['createdAt', 'updatedAt'],
      });

      let totalDeliveryTime = 0;
      for (const order of deliveredOrdersData) {
        const created = new Date(order.createdAt).getTime();
        const updated = new Date(order.updatedAt).getTime();
        totalDeliveryTime += (updated - created) / (1000 * 60);
      }
      averageDeliveryTimeMinutes = Math.round(totalDeliveryTime / deliveredOrders);
    }

    return {
      totalOrders,
      deliveredOrders,
      pendingOrders,
      cancelledOrders,
      inTransitOrders,
      averageDeliveryTimeMinutes,
    };
  }
}