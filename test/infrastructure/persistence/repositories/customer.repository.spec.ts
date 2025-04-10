import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateCustomerDto, UpdateCustomerDto } from '@infrastructure/controllers/dtos/customer.dto';
import { Customer } from '@domain/entities/customer.entity';
import { CustomerEntity } from '@infrastructure/persistence/entities/customer.entity';
import { CustomerRepository } from '@infrastructure/persistence/repositories/customer.repository';

describe('CustomerRepository', () => {
  let repository: CustomerRepository;
  let typeOrmRepository: Repository<CustomerEntity>;

  const mockTypeOrmRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomerRepository,
        {
          provide: getRepositoryToken(CustomerEntity),
          useValue: mockTypeOrmRepository,
        },
      ],
    }).compile();

    repository = module.get<CustomerRepository>(CustomerRepository);
    typeOrmRepository = module.get<Repository<CustomerEntity>>(getRepositoryToken(CustomerEntity));

    // Reset all mocks before each test
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('create', () => {
    it('should create a customer', async () => {
      const createCustomerDto: CreateCustomerDto = {
        name: 'John Doe',
        email: 'john@example.com',
        phoneNumber: '+1234567890',
        address: {
          street: '123 Main St',
          city: 'New York',
          state: 'NY',
          zipCode: '10001',
          country: 'USA',
        },
      };

      const customerEntity = new CustomerEntity();
      customerEntity.id = '123';
      customerEntity.name = createCustomerDto.name;
      customerEntity.email = createCustomerDto.email;
      customerEntity.phoneNumber = createCustomerDto.phoneNumber;
      customerEntity.address = createCustomerDto.address;

      const customer = Customer.create(
        customerEntity.id,
        customerEntity.name,
        customerEntity.email,
        customerEntity.phoneNumber,
        customerEntity.address,
      );

      mockTypeOrmRepository.create.mockReturnValue(customerEntity);
      mockTypeOrmRepository.save.mockResolvedValue(customerEntity);

      const result = await repository.create(createCustomerDto);

      expect(result).toBeDefined();
      expect(result.getId()).toEqual(customer.getId());
      expect(result.getName()).toEqual(customer.getName());
      expect(result.getEmail()).toEqual(customer.getEmail());
      expect(result.getPhoneNumber()).toEqual(customer.getPhoneNumber());
      expect(result.getAddress()).toEqual(customer.getAddress());
      expect(typeOrmRepository.create).toHaveBeenCalled();
      expect(typeOrmRepository.save).toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('should return all customers', async () => {
      const customerEntities = [
        {
          id: '123',
          name: 'John Doe',
          email: 'john@example.com',
          phoneNumber: '+1234567890',
          address: {
            street: '123 Main St',
            city: 'New York',
            state: 'NY',
            zipCode: '10001',
            country: 'USA',
          },
        },
      ];

      const customers = customerEntities.map(entity =>
        Customer.create(entity.id, entity.name, entity.email, entity.phoneNumber, entity.address),
      );

      mockTypeOrmRepository.find.mockResolvedValue(customerEntities);

      const result = await repository.findAll();

      expect(result).toHaveLength(customers.length);
      expect(result[0].getId()).toEqual(customers[0].getId());
      expect(typeOrmRepository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a customer by id', async () => {
      const customerId = '123';
      const customerEntity = {
        id: customerId,
        name: 'John Doe',
        email: 'john@example.com',
        phoneNumber: '+1234567890',
        address: {
          street: '123 Main St',
          city: 'New York',
          state: 'NY',
          zipCode: '10001',
          country: 'USA',
        },
      };

      const customer = Customer.create(
        customerEntity.id,
        customerEntity.name,
        customerEntity.email,
        customerEntity.phoneNumber,
        customerEntity.address,
      );

      mockTypeOrmRepository.findOne.mockResolvedValue(customerEntity);

      const result = await repository.findOne(customerId);

      expect(result).toBeDefined();
      expect(result.getId()).toEqual(customer.getId());
      expect(typeOrmRepository.findOne).toHaveBeenCalledWith({ where: { id: customerId } });
    });
  });

  describe('update', () => {
    it('should update a customer', async () => {
      const customerId = '123';
      const updateCustomerDto: UpdateCustomerDto = {
        name: 'John Updated',
      };

      const existingCustomerEntity = {
        id: customerId,
        name: 'John Doe',
        email: 'john@example.com',
        phoneNumber: '+1234567890',
        address: {
          street: '123 Main St',
          city: 'New York',
          state: 'NY',
          zipCode: '10001',
          country: 'USA',
        },
      };

      const updatedCustomerEntity = {
        ...existingCustomerEntity,
        name: updateCustomerDto.name,
      };

      mockTypeOrmRepository.findOne.mockResolvedValueOnce(existingCustomerEntity);
      mockTypeOrmRepository.save.mockResolvedValueOnce(updatedCustomerEntity);

      const result = await repository.update(customerId, updateCustomerDto);

      expect(result).toBeDefined();
      expect(result.getName()).toEqual(updateCustomerDto.name);
      expect(typeOrmRepository.findOne).toHaveBeenCalledWith({ where: { id: customerId } });
      expect(typeOrmRepository.save).toHaveBeenCalledWith({
        ...existingCustomerEntity,
        name: updateCustomerDto.name,
      });
    });
  });

  describe('remove', () => {
    it('should remove a customer', async () => {
      const customerId = '123';

      mockTypeOrmRepository.delete.mockResolvedValue({ affected: 1 });

      await repository.remove(customerId);

      expect(typeOrmRepository.delete).toHaveBeenCalledWith(customerId);
    });
  });
});
