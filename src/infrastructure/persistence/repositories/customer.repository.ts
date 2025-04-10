import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateCustomerDto, UpdateCustomerDto } from '@infrastructure/controllers/dtos/customer.dto';
import { Customer as CustomerEntity } from '@domain/entities/customer.entity';
import { CustomerDocument } from '../schemas/customer.schema';

@Injectable()
export class CustomerRepository {
  constructor(
    @InjectModel('Customer')
    private readonly customerModel: Model<CustomerDocument>,
  ) {}

  async create(createCustomerDto: CreateCustomerDto): Promise<CustomerEntity> {
    const createdCustomer = new this.customerModel(createCustomerDto);
    const savedEntity = await createdCustomer.save();
    return this.toDomain(savedEntity);
  }

  async findAll(): Promise<CustomerEntity[]> {
    const docs = await this.customerModel.find().exec();
    return docs.map(doc => this.toDomain(doc));
  }

  async findOne(id: string): Promise<CustomerEntity> {
    const doc = await this.customerModel.findById(id).exec();
    if (!doc) {
      throw new Error('Customer not found');
    }
    return this.toDomain(doc);
  }

  async update(id: string, updateCustomerDto: UpdateCustomerDto): Promise<CustomerEntity> {
    const updatedDoc = await this.customerModel.findByIdAndUpdate(id, updateCustomerDto, { new: true }).exec();
    if (!updatedDoc) {
      throw new Error('Customer not found');
    }
    return this.toDomain(updatedDoc);
  }

  async remove(id: string): Promise<void> {
    const result = await this.customerModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new Error('Customer not found');
    }
  }

  private toDomain(doc: CustomerDocument): CustomerEntity {
    // Mapping from Mongoose document to domain entity; assumes CustomerEntity.create exists
    return CustomerEntity.create(
      doc._id,
      doc.name,
      doc.email,
      doc.phoneNumber,
      doc.address
    );
  }
}
