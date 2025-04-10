import { Injectable } from '@nestjs/common';
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customer.dto';
import { Customer } from '@domain/entities/customer.entity';
import { CustomerRepository } from '@infrastructure/persistence/repositories/customer.repository';

@Injectable()
export class CustomerService {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    return this.customerRepository.create(createCustomerDto);
  }

  async findAll(): Promise<Customer[]> {
    return this.customerRepository.findAll();
  }

  async findOne(id: string): Promise<Customer> {
    return this.customerRepository.findOne(id);
  }

  async update(id: string, updateCustomerDto: UpdateCustomerDto): Promise<Customer> {
    return this.customerRepository.update(id, updateCustomerDto);
  }

  async remove(id: string): Promise<void> {
    await this.customerRepository.remove(id);
  }
} 