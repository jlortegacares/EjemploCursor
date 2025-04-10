import { IsString, IsNumber, IsOptional, IsArray } from 'class-validator';

/**
 * Data Transfer Object for creating a new order
 * Contains all necessary fields for order creation with validation rules
 */
export class CreateOrderDto {
  /**
   * ID of the customer placing the order
   * @example "123e4567-e89b-12d3-a456-426614174000"
   */
  @IsString()
  customerId: string;

  /**
   * Array of product IDs included in the order
   * @example ["prod-1", "prod-2"]
   */
  @IsArray()
  @IsString({ each: true })
  products: string[];

  /**
   * Total amount of the order
   * @example 99.99
   */
  @IsNumber()
  total: number;

  /**
   * Current status of the order
   * @example "pending"
   */
  @IsString()
  @IsOptional()
  status?: string;

  /**
   * Shipping address for the order
   * @example "123 Main St, City, Country"
   */
  @IsString()
  @IsOptional()
  shippingAddress?: string;
}
