import {
  IsString,
  MinLength,
  MaxLength,
  IsNotEmpty,
  IsBoolean,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { User } from './user.entity';

export class SignupDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5, { message: 'username must be at least 5 characters long' })
  @MaxLength(15, { message: 'username must be at max 15 characters long' })
  @ApiProperty({
    type: String,
    description: 'username is a required property',
    default: 'seez_user',
  })
  username: string;

  @IsString()
  @IsNotEmpty({ message: 'password must not be empty' })
  @MinLength(6, { message: 'password must be at least 6 characters long' })
  @MaxLength(15, { message: 'password must be at max 15 characters long' })
  @ApiProperty({
    type: String,
    description: 'password is a required property',
    default: 'password',
  })
  password: string;

  @IsBoolean()
  @ApiProperty({
    type: Boolean,
    description: 'isSuperUser is a required property',
    default: false,
  })
  isSuperUser: boolean;
}

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5, { message: 'username must be at least 5 characters long' })
  @MaxLength(15, { message: 'username must be at max 15 characters long' })
  @ApiProperty({
    type: String,
    description: 'username is a required property',
    default: 'faizanzafar',
  })
  username: string;

  @IsString()
  @IsNotEmpty({ message: 'password must not be empty' })
  @MinLength(6, { message: 'password must be at least 6 characters long' })
  @MaxLength(15, { message: 'password must be at max 15 characters long' })
  @ApiProperty({
    type: String,
    description: 'password is a required property',
    default: 'password',
  })
  password: string;
}

export class AuthResponseDto {
  user: Partial<User>;

  access_token: string;
}
