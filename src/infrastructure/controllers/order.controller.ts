import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';

import { CreateOrderDto } from './dtos/create-order.dto';
import { OrderService } from '@application/services/order.service';
import { UpdateOrderDto } from './dtos/update-order.dto';

/**
 * Controller for handling order-related operations
 * Exposes REST endpoints for CRUD operations on orders
 */
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  /**
   * Creates a new order
   * @param createOrderDto - Data for creating a new order
   * @returns The created order
   */
  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  /**
   * Retrieves all orders
   * @returns Array of all orders
   */
  @Get()
  async findAll() {
    return this.orderService.findAll();
  }

  /**
   * Retrieves a specific order by ID
   * @param id - The ID of the order to retrieve
   * @returns The requested order
   */
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.orderService.findOne(id);
  }

  /**
   * Updates an existing order
   * @param id - The ID of the order to update
   * @param updateOrderDto - Data for updating the order
   * @returns The updated order
   */
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(id, updateOrderDto);
  }

  /**
   * Deletes an order
   * @param id - The ID of the order to delete
   * @returns The deleted order
   */
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.orderService.remove(id);
  }
}
