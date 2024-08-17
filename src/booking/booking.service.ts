import {
    ForbiddenException,
    Injectable,
    NotFoundException,
  } from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm';
  import { Repository } from 'typeorm';
  import { ObjectId } from 'mongodb';
  
  import { Booking } from './booking.entity';
  import { BookingDto } from './booking.dto';
  import { CarService } from '../car/car.service';
  import { User } from '../auth/user.entity';

  
  @Injectable()
  export class BookingService {
    constructor(
      @InjectRepository(Booking)
      private bookingRepository: Repository<Booking>,
      private carService: CarService,
    ) {}
  
    async create(
      createBookingDto: BookingDto,
      user: Partial<User>,
    ): Promise<Booking> {
      const { carId, startDate, endDate } = createBookingDto;
  
      const car = await this.carService.markCarAsUnavailable(carId);
  
      const booking = this.bookingRepository.create({
        car,
        user,
        startDate,
        endDate,
        bookedAt: new Date(),
      });
  
      return this.bookingRepository.save(booking);
    }
  
    async findAll(): Promise<Booking[]> {
      return this.bookingRepository.find();
    }
  
    async findById(id: string): Promise<Booking> {
      const booking = await this.bookingRepository.findOne({
        where: { _id: new ObjectId(id) } as Partial<Booking>,
      });
  
      if (!booking) {
        throw new NotFoundException(`Booking with ID ${id} not found`);
      }
  
      return booking;
    }
  
    async cancel(id: string): Promise<void> {
      const booking = await this.findById(id);
      // Checking if booking can be cancelled
      const now = new Date();
      const bookingAge = now.getTime() - booking.bookedAt.getTime();
      const twentyFourHours = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
  
      if (bookingAge < twentyFourHours) {
        throw new ForbiddenException(
          'Booking cannot be canceled within the first 24 hours',
        );
      }
  
      // Make car available
      await this.carService.markCarAsAavailable(booking.car.id);
  
      await this.bookingRepository.remove(booking);
    }
  }
  