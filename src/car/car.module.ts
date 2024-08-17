import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CarService } from './car.service';
import { CarController } from './car.controller';
import { Car } from './car.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Car])],
  providers: [CarService],
  exports: [CarService],
  controllers: [CarController],
})
export class CarModule {}
