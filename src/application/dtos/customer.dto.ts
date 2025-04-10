import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, Length } from 'class-validator';

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

  @ApiProperty({ description: 'Teléfono del cliente', example: '+34600000000' })
  @IsNotEmpty()
  @IsPhoneNumber()
  phone: string;

  @ApiProperty({ description: 'Dirección del cliente', example: 'Calle Principal 123' })
  @IsNotEmpty()
  @IsString()
  @Length(5, 200)
  address: string;
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

  @ApiProperty({ description: 'Teléfono del cliente', example: '+34600000000', required: false })
  @IsOptional()
  @IsPhoneNumber()
  phone?: string;

  @ApiProperty({ description: 'Dirección del cliente', example: 'Calle Principal 123', required: false })
  @IsOptional()
  @IsString()
  @Length(5, 200)
  address?: string;
} 