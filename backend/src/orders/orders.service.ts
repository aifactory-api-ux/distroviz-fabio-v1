import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderEntity } from '../database/entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './dto/order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrderEntity)
    private ordersRepository: Repository<OrderEntity>,
  ) {}

  async findAll(): Promise<Order[]> {
    const orders = await this.ordersRepository.find();
    return orders.map(order => this.toOrderDto(order));
  }

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    if (!createOrderDto.product_name) {
      throw new BadRequestException('product_name is required');
    }
    if (typeof createOrderDto.quantity !== 'number' || createOrderDto.quantity <= 0) {
      throw new BadRequestException('quantity must be a positive number');
    }
    if (!createOrderDto.plant) {
      throw new BadRequestException('plant is required');
    }
    if (!createOrderDto.distribution_center) {
      throw new BadRequestException('distribution_center is required');
    }

    const order = this.ordersRepository.create({
      product_name: createOrderDto.product_name,
      quantity: createOrderDto.quantity,
      plant: createOrderDto.plant,
      distribution_center: createOrderDto.distribution_center,
      status: 'pending',
    });

    const savedOrder = await this.ordersRepository.save(order);
    return this.toOrderDto(savedOrder);
  }

  private toOrderDto(entity: OrderEntity): Order {
    return {
      id: entity.id,
      product_name: entity.product_name,
      quantity: entity.quantity,
      plant: entity.plant,
      distribution_center: entity.distribution_center,
      status: entity.status as 'pending' | 'dispatched' | 'delivered',
      created_at: entity.created_at.toISOString(),
      updated_at: entity.updated_at.toISOString(),
    };
  }
}