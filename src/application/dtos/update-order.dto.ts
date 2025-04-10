import { IsString, IsNumber, IsOptional, IsArray } from 'class-validator';

/**
 * Data Transfer Object for updating an existing order
 * All fields are optional as only changed fields need to be provided
 */
export class UpdateOrderDto {
  /**
   * ID of the customer placing the order
   * @example "123e4567-e89b-12d3-a456-426614174000"
   */
  @IsString()
  @IsOptional()
  customerId?: string;

  /**
   * Array of product IDs included in the order
   * @example ["prod-1", "prod-2"]
   */
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  products?: string[];

  /**
   * Total amount of the order
   * @example 99.99
   */
  @IsNumber()
  @IsOptional()
  total?: number;

  /**
   * Current status of the order
   * @example "shipped"
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