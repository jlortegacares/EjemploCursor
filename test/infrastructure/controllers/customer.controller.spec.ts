import { Test, TestingModule } from '@nestjs/testing';

import { CreateCustomerDto, UpdateCustomerDto } from '../../../src/infrastructure/controllers/dtos/customer.dto';
import { CustomerService } from '../../../src/application/services/customer.service';
import { Customer } from '../../../src/domain/entities/customer.entity';
import { CustomerController } from '../../../src/infrastructure/controllers/customer.controller';

describe('CustomerController', () => {
  let controller: CustomerController;
  let service: CustomerService;

  const mockService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomerController],
      providers: [
        {
          provide: CustomerService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<CustomerController>(CustomerController);
    service = module.get<CustomerService>(CustomerService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
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

      mockService.create.mockResolvedValue(expectedCustomer);

      const result = await controller.create(createCustomerDto);

      expect(result).toEqual(expectedCustomer);
      expect(service.create).toHaveBeenCalledWith(createCustomerDto);
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

      mockService.findAll.mockResolvedValue(expectedCustomers);

      const result = await controller.findAll();

      expect(result).toEqual(expectedCustomers);
      expect(service.findAll).toHaveBeenCalled();
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

      mockService.findOne.mockResolvedValue(expectedCustomer);

      const result = await controller.findOne(customerId);

      expect(result).toEqual(expectedCustomer);
      expect(service.findOne).toHaveBeenCalledWith(customerId);
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

      mockService.update.mockResolvedValue(expectedCustomer);

      const result = await controller.update(customerId, updateCustomerDto);

      expect(result).toEqual(expectedCustomer);
      expect(service.update).toHaveBeenCalledWith(customerId, updateCustomerDto);
    });
  });

  describe('remove', () => {
    it('should remove a customer', async () => {
      const customerId = '123';

      await controller.remove(customerId);

      expect(service.remove).toHaveBeenCalledWith(customerId);
    });
  });
});
