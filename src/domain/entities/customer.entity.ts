import { Email } from '../value-objects/email.value-object';
import { PhoneNumber } from '../value-objects/phone-number.value-object';
import { Address } from '../value-objects/address.value-object';

export class Customer {
  private constructor(
    private readonly id: string,
    private name: string,
    private email: Email,
    private phoneNumber: PhoneNumber,
    private address: Address,
    private readonly createdAt: Date,
    private updatedAt: Date
  ) {}

  public static create(
    id: string,
    name: string,
    email: string,
    phoneNumber: string,
    address: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
      country: string;
    }
  ): Customer {
    return new Customer(
      id,
      name,
      Email.create(email),
      PhoneNumber.create(phoneNumber),
      Address.create(
        address.street,
        address.city,
        address.state,
        address.zipCode,
        address.country
      ),
      new Date(),
      new Date()
    );
  }

  // Getters
  public getId(): string {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getEmail(): Email {
    return this.email;
  }

  public getPhoneNumber(): PhoneNumber {
    return this.phoneNumber;
  }

  public getAddress(): Address {
    return this.address;
  }

  // Métodos de actualización
  public updateName(name: string): void {
    this.name = name;
    this.updatedAt = new Date();
  }

  public updateEmail(email: Email): void {
    this.email = email;
    this.updatedAt = new Date();
  }

  public updatePhoneNumber(phoneNumber: PhoneNumber): void {
    this.phoneNumber = phoneNumber;
    this.updatedAt = new Date();
  }

  public updateAddress(address: Address): void {
    this.address = address;
    this.updatedAt = new Date();
  }
} 