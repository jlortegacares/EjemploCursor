import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsOptional, IsString, Length, ValidateNested } from 'class-validator';

import { AddressDto } from '../../infrastructure/controllers/dtos/customer.dto';

export class CreateCustomerDto {
  @ApiProperty({ description: 'Nombre del cliente', example: 'John Doe' })
  @IsNotEmpty()
  @IsString()
  @Length(2, 100)
  name: string;

  @ApiProperty({ description: 'Email del cliente', example: 'john@example.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Número de teléfono del cliente', example: '+34600000000' })
  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  @ApiProperty({ description: 'Dirección del cliente', type: AddressDto })
  @ValidateNested()
  @Type(() => AddressDto)
  address: AddressDto;
}

export class UpdateCustomerDto {
  @ApiProperty({ description: 'Nombre del cliente', example: 'John Doe', required: false })
  @IsOptional()
  @IsString()
  @Length(2, 100)
  name?: string;

  @ApiProperty({ description: 'Email del cliente', example: 'john@example.com', required: false })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({
    description: 'Número de teléfono del cliente',
    example: '+34600000000',
    required: false,
  })
  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @ApiProperty({
    description: 'Dirección del cliente',
    type: AddressDto,
    required: false,
  })
  @ValidateNested()
  @Type(() => AddressDto)
  address?: AddressDto;
} 