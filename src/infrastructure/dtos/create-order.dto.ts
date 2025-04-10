import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsUUID, Min } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({ description: 'ID del cliente', example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsNotEmpty()
  @IsUUID()
  customerId: string;

  @ApiProperty({ description: 'Descripción del pedido', example: 'Pedido de productos electrónicos' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ description: 'Monto total del pedido', example: 99.99 })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  totalAmount: number;
} 