import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Order } from '../../../domain/entities/order.entity';
import { CreateOrderDto } from '../../dtos/create-order.dto';
import { UpdateOrderDto } from '../../dtos/update-order.dto';

@Injectable()
export class OrderRepository {
  constructor(
    @InjectModel(Order.name)
    private readonly orderModel: Model<Order>,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const createdOrder = new this.orderModel(createOrderDto);
    return createdOrder.save();
  }

  async findAll(): Promise<Order[]> {
    return this.orderModel.find().exec();
  }

  async findOne(id: string): Promise<Order | null> {
    return this.orderModel.findById(id).exec();
  }

  async update(id: string, updateOrderDto: UpdateOrderDto): Promise<Order | null> {
    return this.orderModel
      .findByIdAndUpdate(id, updateOrderDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<void> {
    await this.orderModel.findByIdAndDelete(id).exec();
  }
} 