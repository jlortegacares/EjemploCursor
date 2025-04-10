import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateCustomerDto, UpdateCustomerDto } from '@infrastructure/controllers/dtos/customer.dto';
import { Customer } from '@domain/entities/customer.entity';

import { CustomerEntity } from '../entities/customer.entity';

@Injectable()
export class CustomerRepository {
  constructor(
    @InjectRepository(CustomerEntity)
    private readonly repository: Repository<CustomerEntity>,
  ) {}

  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    const customerEntity = this.repository.create({
      name: createCustomerDto.name,
      email: createCustomerDto.email,
      phoneNumber: createCustomerDto.phoneNumber,
      address: createCustomerDto.address,
    });

    const savedEntity = await this.repository.save(customerEntity);
    return this.toDomain(savedEntity);
  }

  async findAll(): Promise<Customer[]> {
    const entities = await this.repository.find();
    return entities.map(entity => this.toDomain(entity));
  }

  async findOne(id: string): Promise<Customer> {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) {
      throw new Error('Customer not found');
    }
    return this.toDomain(entity);
  }

  async update(id: string, updateCustomerDto: UpdateCustomerDto): Promise<Customer> {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) {
      throw new Error('Customer not found');
    }

    if (updateCustomerDto.name) {
      entity.name = updateCustomerDto.name;
    }
    if (updateCustomerDto.email) {
      entity.email = updateCustomerDto.email;
    }
    if (updateCustomerDto.phoneNumber) {
      entity.phoneNumber = updateCustomerDto.phoneNumber;
    }
    if (updateCustomerDto.address) {
      entity.address = updateCustomerDto.address;
    }

    const updatedEntity = await this.repository.save(entity);
    return this.toDomain(updatedEntity);
  }

  async remove(id: string): Promise<void> {
    const result = await this.repository.delete(id);
    if (result.affected === 0) {
      throw new Error('Customer not found');
    }
  }

  private toDomain(entity: CustomerEntity): Customer {
    return Customer.create(
      entity.id,
      entity.name,
      entity.email,
      entity.phoneNumber,
      entity.address,
    );
  }
}
