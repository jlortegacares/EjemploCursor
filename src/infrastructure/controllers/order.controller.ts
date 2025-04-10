import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { OrderService } from '../../application/services/order.service';
import { CreateOrderDto } from '../dtos/create-order.dto';
import { UpdateOrderDto } from '../dtos/update-order.dto';

/**
 * Controller for handling order-related operations
 * Exposes REST endpoints for CRUD operations on orders
 */
@ApiTags('orders')
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  /**
   * Creates a new order
   * @param createOrderDto - Data for creating a new order
   * @returns The created order
   */
  @Post()
  @ApiOperation({ summary: 'Create a new order' })
  @ApiResponse({ status: 201, description: 'Order created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  async create(@Body() createOrderDto: CreateOrderDto) {
    try {
      return await this.orderService.create(createOrderDto);
    } catch (error) {
      throw new Error(`Error al crear el pedido: ${error.message}`);
    }
  }

  /**
   * Retrieves all orders
   * @returns Array of all orders
   */
  @Get()
  @ApiOperation({ summary: 'Get all orders' })
  @ApiResponse({ status: 200, description: 'List of orders retrieved successfully' })
  async findAll() {
    try {
      return await this.orderService.findAll();
    } catch (error) {
      throw new Error(`Error al obtener los pedidos: ${error.message}`);
    }
  }

  /**
   * Retrieves a specific order by ID
   * @param id - The ID of the order to retrieve
   * @returns The requested order
   */
  @Get(':id')
  @ApiOperation({ summary: 'Get an order by ID' })
  @ApiResponse({ status: 200, description: 'Order found and retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Order not found' })
  async findOne(@Param('id') id: string) {
    try {
      const order = await this.orderService.findOne(id);
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
  @Put(':id')
  @ApiOperation({ summary: 'Update an order' })
  @ApiResponse({ status: 200, description: 'Order updated successfully' })
  @ApiResponse({ status: 404, description: 'Order not found' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  async update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    try {
      const order = await this.orderService.update(id, updateOrderDto);
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
   * Deletes an order
   * @param id - The ID of the order to delete
   * @returns The deleted order
   */
  @Delete(':id')
  @ApiOperation({ summary: 'Delete an order' })
  @ApiResponse({ status: 200, description: 'Order deleted successfully' })
  @ApiResponse({ status: 404, description: 'Order not found' })
  async remove(@Param('id') id: string) {
    try {
      const order = await this.orderService.findOne(id);
      if (!order) {
        throw new NotFoundException(`Pedido con ID ${id} no encontrado`);
      }
      await this.orderService.remove(id);
      return { message: 'Pedido eliminado correctamente' };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(`Error al eliminar el pedido: ${error.message}`);
    }
  }
}
