import { Injectable, NotFoundException } from '@nestjs/common';

import { Order } from '../../domain/entities/order.entity';
import { OrderRepository } from '../../infrastructure/persistence/repositories/order.repository';
import { CreateOrderDto } from '../../infrastructure/dtos/create-order.dto';
import { UpdateOrderDto } from '../../infrastructure/dtos/update-order.dto';

/**
 * Service responsible for handling order-related business logic
 * Implements CRUD operations for orders
 */
@Injectable()
export class OrderService {
  constructor(private readonly orderRepository: OrderRepository) {}

  /**
   * Creates a new order in the system
   * @param createOrderDto - Data for creating the order
   * @returns The created order
   */
  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    try {
      return await this.orderRepository.create(createOrderDto);
    } catch (error) {
      throw new Error(`Error al crear el pedido: ${error.message}`);
    }
  }

  /**
   * Retrieves all orders from the system
   * @returns Array of all orders
   */
  async findAll(): Promise<Order[]> {
    try {
      return await this.orderRepository.findAll();
    } catch (error) {
      throw new Error(`Error al obtener los pedidos: ${error.message}`);
    }
  }

  /**
   * Retrieves a specific order by its ID
   * @param id - The ID of the order to retrieve
   * @returns The requested order
   */
  async findOne(id: string): Promise<Order> {
    try {
      const order = await this.orderRepository.findOne(id);
      if (!order) {
        throw new NotFoundException(`Pedido con ID ${id} no encontrado`);
      }
      return order;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(`Error al obtener el pedido: ${error.message}`);
    }
  }

  /**
   * Updates an existing order
   * @param id - The ID of the order to update
   * @param updateOrderDto - Data for updating the order
   * @returns The updated order
   */
  async update(id: string, updateOrderDto: UpdateOrderDto): Promise<Order> {
    try {
      const order = await this.orderRepository.update(id, updateOrderDto);
      if (!order) {
        throw new NotFoundException(`Pedido con ID ${id} no encontrado`);
      }
      return order;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(`Error al actualizar el pedido: ${error.message}`);
    }
  }

  /**
   * Removes an order from the system
   * @param id - The ID of the order to remove
   * @returns The removed order
   */
  async remove(id: string): Promise<void> {
    try {
      const order = await this.orderRepository.findOne(id);
      if (!order) {
        throw new NotFoundException(`Pedido con ID ${id} no encontrado`);
      }
      await this.orderRepository.remove(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(`Error al eliminar el pedido: ${error.message}`);
    }
  }
}
