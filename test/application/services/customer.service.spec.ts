import { Test, TestingModule } from '@nestjs/testing';

import { CreateCustomerDto, UpdateCustomerDto } from '../../../src/application/dtos/customer.dto';
import { CustomerService } from '../../../src/application/services/customer.service';
import { Customer } from '../../../src/domain/entities/customer.entity';
import { CustomerRepository } from '../../../src/infrastructure/persistence/repositories/customer.repository';

describe('CustomerService', () => {
  let service: CustomerService;
  let repository: CustomerRepository;

  const mockRepository = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomerService,
        {
          provide: CustomerRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<CustomerService>(CustomerService);
    repository = module.get<CustomerRepository>(CustomerRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
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

      const expectedCustomer = Customer.create(
        '123',
        createCustomerDto.name,
        createCustomerDto.email,
        createCustomerDto.phoneNumber,
        createCustomerDto.address,
      );

      mockRepository.create.mockResolvedValue(expectedCustomer);

      const result = await service.create(createCustomerDto);

      expect(result).toEqual(expectedCustomer);
      expect(repository.create).toHaveBeenCalledWith(createCustomerDto);
    });
  });

  describe('findAll', () => {
    it('should return all customers', async () => {
      const expectedCustomers = [
        Customer.create('123', 'John Doe', 'john@example.com', '+1234567890', {
          street: '123 Main St',
          city: 'New York',
          state: 'NY',
          zipCode: '10001',
          country: 'USA',
        }),
      ];

      mockRepository.findAll.mockResolvedValue(expectedCustomers);

      const result = await service.findAll();

      expect(result).toEqual(expectedCustomers);
      expect(repository.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a customer by id', async () => {
      const customerId = '123';
      const expectedCustomer = Customer.create(
        customerId,
        'John Doe',
        'john@example.com',
        '+1234567890',
        {
          street: '123 Main St',
          city: 'New York',
          state: 'NY',
          zipCode: '10001',
          country: 'USA',
        },
      );

      mockRepository.findOne.mockResolvedValue(expectedCustomer);

      const result = await service.findOne(customerId);

      expect(result).toEqual(expectedCustomer);
      expect(repository.findOne).toHaveBeenCalledWith(customerId);
    });
  });

  describe('update', () => {
    it('should update a customer', async () => {
      const customerId = '123';
      const updateCustomerDto: UpdateCustomerDto = {
        name: 'John Updated',
      };

      const expectedCustomer = Customer.create(
        customerId,
        updateCustomerDto.name,
        'john@example.com',
        '+1234567890',
        {
          street: '123 Main St',
          city: 'New York',
          state: 'NY',
          zipCode: '10001',
          country: 'USA',
        },
      );

      mockRepository.update.mockResolvedValue(expectedCustomer);

      const result = await service.update(customerId, updateCustomerDto);

      expect(result).toEqual(expectedCustomer);
      expect(repository.update).toHaveBeenCalledWith(customerId, updateCustomerDto);
    });
  });

  describe('remove', () => {
    it('should remove a customer', async () => {
      const customerId = '123';

      await service.remove(customerId);

      expect(repository.remove).toHaveBeenCalledWith(customerId);
    });
  });
});
