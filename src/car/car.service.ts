import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';

import { Car } from './car.entity';
import {
  CreateCarDto,
  FindCarsDto,
  PaginatedResponseDto,
  UpdateCarDto,
} from './car.dto';
import { User } from '../auth/user.entity';
@Injectable()
export class CarService {
  constructor(
    @InjectRepository(Car)
    private carRepository: Repository<Car>,
  ) {}

  create(car: CreateCarDto): Promise<Car> {
    return this.carRepository.save(car);
  }

  async findAll(query: FindCarsDto): Promise<PaginatedResponseDto<Car>> {
    const {
      make,
      model,
      fromYear,
      toYear,
      fromPrice,
      toPrice,
      fromMileage,
      toMileage,
      search,
      page = 1,
      limit = 10,
    } = query;
    const where: any = {};
    if (search) {
      where['$text'] = { $search: search }; // Full-text search
    } else {
      if (make) where['make'] = make;
      if (model) where['model'] = model;

      // Handle year filtering
      if (fromYear && toYear) {
        where['year'] = { $gte: Number(fromYear), $lte: Number(toYear) };
      } else if (fromYear) {
        where['year'] = { $gte: Number(fromYear) };
      } else if (toYear) {
        where['year'] = { $lte: Number(toYear) };
      }

      // Handle price filtering
      if (fromPrice && toPrice) {
        where['price'] = { $gte: Number(fromPrice), $lte: Number(toPrice) };
      } else if (fromPrice) {
        where['price'] = { $gte: Number(fromPrice) };
      } else if (toPrice) {
        where['price'] = { $lte: Number(toPrice) };
      }

      // Handle mileage filtering
      if (fromMileage && toMileage) {
        where['mileage'] = {
          $gte: Number(fromMileage),
          $lte: Number(toMileage),
        };
      } else if (fromMileage) {
        where['mileage'] = { $gte: Number(fromMileage) };
      } else if (toMileage) {
        where['mileage'] = { $lte: Number(toMileage) };
      }
    }

    const [cars, total] = await this.carRepository.findAndCount({
      where,
      take: Number(limit), // Number of records per page
      skip: (page - 1) * limit,
      order: {
        numberOfBookings: 'DESC',
      },
    });

    const response: PaginatedResponseDto<Car> = {
      payload: cars,
      total,
      page,
      limit,
    };

    return response;
  }

  async findById(id: string): Promise<Car> {
    const car = await this.carRepository.findOne({
      where: { _id: new ObjectId(id) } as Partial<User>,
    });
    if (!car) {
      throw new NotFoundException(`Car with ID ${id} not found`);
    }
    return car;
  }

  async update(id: string, updateCarDto: UpdateCarDto): Promise<Car> {
    const car = await this.findById(id);
    Object.assign(car, updateCarDto);
    return this.carRepository.save(car);
  }

  async remove(id: string): Promise<void> {
    const car = await this.findById(id);
    await this.carRepository.remove(car);
  }

  save(car: Car): Promise<Car> {
    return this.carRepository.save(car);
  }

  async markCarAsUnavailable(id: string): Promise<Car> {
    const car = await this.findById(id);
    if (!car.isCarAvailable()) {
      throw new Error(`Car is not available for booking`);
    }
    car.markCarAsUnavailable();
    await this.save(car);
    return car;
  }

  async markCarAsAavailable(id: string): Promise<void> {
    const car = await this.findById(id);
    car.markCarAsAavailable();
    await this.save(car);
  }
}
