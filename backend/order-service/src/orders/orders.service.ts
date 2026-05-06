import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { OrderCreate, OrderUpdateStatus } from './dto/order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
  ) {}

  async findAll(): Promise<Order[]> {
    return this.orderRepository.find({
      relations: ['items'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: ['items'],
    });
    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }
    return order;
  }

  async create(orderData: OrderCreate): Promise<Order> {
    const order = this.orderRepository.create({
      customerName: orderData.customerName,
      address: orderData.address,
      status: 'pending',
    });

    const savedOrder = await this.orderRepository.save(order);

    const items = orderData.items.map((item) =>
      this.orderItemRepository.create({
        orderId: savedOrder.id,
        productName: item.productName,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
      }),
    );

    await this.orderItemRepository.save(items);

    return this.findOne(savedOrder.id);
  }

  async updateStatus(id: number, statusData: OrderUpdateStatus): Promise<Order> {
    const order = await this.findOne(id);
    order.status = statusData.status;
    return this.orderRepository.save(order);
  }

  async remove(id: number): Promise<{ success: boolean }> {
    const order = await this.findOne(id);
    await this.orderRepository.remove(order);
    return { success: true };
  }
}