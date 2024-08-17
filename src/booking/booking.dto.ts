import { IsString, IsDate, MinDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { Car } from '../car/car.entity';
import { User } from '../auth/user.entity';

export class BookingDto {
  @IsString()
  @ApiProperty({
    type: String,
    description: 'Id of the car',
    default: '66bee3dd71e608b7590ae586',
  })
  carId: string;

  @IsDate({ message: 'Invalid value for date' })
  @Type(() => Date)
  @MinDate(new Date())
  @ApiProperty({
    type: Date,
    description: 'Start Date of booking',
    default: '2024-08-08T08:14:00',
  })
  startDate: Date;

  @IsDate({ message: 'Invalid value for date' })
  @Type(() => Date)
  @MinDate(new Date())
  @ApiProperty({
    type: Date,
    description: 'End Date of booking',
    default: '2024-09-09T08:14:00',
  })
  endDate: Date;
}

export class BookingResponseDto {
  id: string;

  car: Partial<Car>;

  user: Partial<User>;

  startDate: Date;

  endDate: Date;

  bookedAt: Date;
}
