import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, IsUUID, Min } from 'class-validator';

export class UpdateOrderDto {
  @ApiProperty({ 
    description: 'ID del cliente',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false
  })
  @IsOptional()
  @IsUUID()
  customerId?: string;

  @ApiProperty({ 
    description: 'Descripción del pedido',
    example: 'Pedido de productos electrónicos',
    required: false
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ 
    description: 'Monto total del pedido',
    example: 99.99,
    required: false
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  totalAmount?: number;
} 