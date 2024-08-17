import {
  IsArray,
  IsString,
  IsNumber,
  IsInt,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCarDto {
  @IsString()
  @ApiProperty({
    type: String,
    description: 'Make of the car',
    default: 'Toyota',
  })
  make: string;

  @IsString()
  @ApiProperty({
    type: String,
    description: 'Model of the car',
    default: 'Corolla',
  })
  model: string;

  @IsNumber()
  @ApiProperty({
    type: Number,
    description: 'Year of the car',
    default: 2024,
  })
  year: number;

  @IsNumber()
  @ApiProperty({
    type: Number,
    description: 'Mileage of the car',
    default: 10000,
  })
  mileage: number;

  @IsNumber()
  @ApiProperty({
    type: Number,
    description: 'Price of the car',
    default: 5000000,
  })
  price: number;
}

export class UpdateCarDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'Make of the car',
    default: 'Toyota',
  })
  make?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'Model of the car',
    default: 'Corolla',
  })
  model?: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    type: String,
    description: 'Year of the car',
    default: 2024,
  })
  year?: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    type: String,
    description: 'Mileage of the car',
    default: 10000,
  })
  mileage?: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    type: String,
    description: 'Price of the car',
    default: 5000000,
  })
  price?: number;
}

export class FindCarsDto {
  @IsOptional()
  page?: number = 1;

  @IsOptional()
  limit?: number = 10;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  make?: string;

  @IsOptional()
  @IsString()
  model?: string;

  @IsOptional()
  fromYear?: number;

  @IsOptional()
  toYear?: number;

  @IsOptional()
  fromMileage?: number;

  @IsOptional()
  toMileage?: number;

  @IsOptional()
  fromPrice?: number;

  @IsOptional()
  toPrice?: number;
  // Other filters can be added here (e.g., make, model)
}

export class PaginatedResponseDto<T> {
  @IsInt()
  @IsOptional()
  total?: number;

  @IsInt()
  @IsOptional()
  page?: number;

  @IsInt()
  @IsOptional()
  limit?: number;

  @IsArray()
  @IsOptional()
  payload: T[];
}
