import { Injectable, NotFoundException } from '@nestjs/common';

import { Customer } from '@domain/entities/customer.entity';
import { CustomerRepository } from '@infrastructure/persistence/repositories/customer.repository';
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customer.dto';

@Injectable()
export class CustomerService {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    try {
      return await this.customerRepository.create(createCustomerDto);
    } catch (error) {
      throw new Error(`Error al crear el cliente: ${error.message}`);
    }
  }

  async findAll(): Promise<Customer[]> {
    try {
      return await this.customerRepository.findAll();
    } catch (error) {
      throw new Error(`Error al obtener los clientes: ${error.message}`);
    }
  }

  async findOne(id: string): Promise<Customer> {
    try {
      const customer = await this.customerRepository.findOne(id);
      if (!customer) {
        throw new NotFoundException(`Cliente con ID ${id} no encontrado`);
      }
      return customer;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(`Error al obtener el cliente: ${error.message}`);
    }
  }

  async update(id: string, updateCustomerDto: UpdateCustomerDto): Promise<Customer> {
    try {
      const customer = await this.customerRepository.update(id, updateCustomerDto);
      if (!customer) {
        throw new NotFoundException(`Cliente con ID ${id} no encontrado`);
      }
      return customer;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(`Error al actualizar el cliente: ${error.message}`);
    }
  }

  async remove(id: string): Promise<void> {
    try {
      const customer = await this.customerRepository.findOne(id);
      if (!customer) {
        throw new NotFoundException(`Cliente con ID ${id} no encontrado`);
      }
      await this.customerRepository.remove(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(`Error al eliminar el cliente: ${error.message}`);
    }
  }
}
