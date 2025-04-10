import { IsString, IsEmail, IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class AddressDto {
  @ApiProperty({
    description: 'Calle del cliente',
    example: 'Av. Principal 123'
  })
  @IsString()
  @IsNotEmpty()
  street: string;

  @ApiProperty({
    description: 'Ciudad del cliente',
    example: 'Ciudad de México'
  })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({
    description: 'Estado del cliente',
    example: 'CDMX'
  })
  @IsString()
  @IsNotEmpty()
  state: string;

  @ApiProperty({
    description: 'Código postal del cliente',
    example: '12345'
  })
  @IsString()
  @IsNotEmpty()
  zipCode: string;

  @ApiProperty({
    description: 'País del cliente',
    example: 'México'
  })
  @IsString()
  @IsNotEmpty()
  country: string;
}

export class CreateCustomerDto {
  @ApiProperty({
    description: 'Nombre completo del cliente',
    example: 'Juan Pérez'
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Correo electrónico del cliente',
    example: 'juan.perez@example.com'
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Número de teléfono del cliente',
    example: '+52 55 1234 5678'
  })
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty({
    description: 'Dirección del cliente',
    type: AddressDto
  })
  @ValidateNested()
  @Type(() => AddressDto)
  address: AddressDto;
}

export class UpdateCustomerDto {
  @ApiProperty({
    description: 'Nombre completo del cliente',
    example: 'Juan Pérez',
    required: false
  })
  @IsString()
  @IsNotEmpty()
  name?: string;

  @ApiProperty({
    description: 'Correo electrónico del cliente',
    example: 'juan.perez@example.com',
    required: false
  })
  @IsEmail()
  email?: string;

  @ApiProperty({
    description: 'Número de teléfono del cliente',
    example: '+52 55 1234 5678',
    required: false
  })
  @IsString()
  @IsNotEmpty()
  phoneNumber?: string;

  @ApiProperty({
    description: 'Dirección del cliente',
    type: AddressDto,
    required: false
  })
  @ValidateNested()
  @Type(() => AddressDto)
  address?: AddressDto;
} 