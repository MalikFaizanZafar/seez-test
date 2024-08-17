import { Test, TestingModule } from '@nestjs/testing';
import { BookingService } from './booking.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ForbiddenException, NotFoundException } from '@nestjs/common';

import { Booking } from './booking.entity';
import { CarService } from '../car/car.service';
import { User } from '../auth/user.entity';
import { BookingDto } from './booking.dto';

describe('BookingService', () => {
  let service: BookingService;
  let bookingRepository: Repository<Booking>;
  let carService: CarService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookingService,
        {
          provide: getRepositoryToken(Booking),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            remove: jest.fn(),
          },
        },
        {
          provide: CarService,
          useValue: {
            markCarAsUnavailable: jest.fn(),
            markCarAsAavailable: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<BookingService>(BookingService);
    bookingRepository = module.get<Repository<Booking>>(
      getRepositoryToken(Booking),
    );
    carService = module.get<CarService>(CarService);
  });

  describe('create', () => {
    it('should create a booking', async () => {
      const createBookingDto: BookingDto = {
        carId: 'someCarId',
        startDate: new Date(),
        endDate: new Date(),
      };

      const user: Partial<User> = { id: 'userId' } as User;

      const car = {
        id: 'someCarId',
        isCarAvailable: jest.fn().mockReturnValue(true),
      };
      const booking = {
        id: 'bookingId',
        car,
        user,
        ...createBookingDto,
        bookedAt: new Date(),
      };

      jest
        .spyOn(carService, 'markCarAsUnavailable')
        .mockResolvedValue(car as any);
      jest.spyOn(bookingRepository, 'create').mockReturnValue(booking as any);
      jest.spyOn(bookingRepository, 'save').mockResolvedValue(booking as any);

      expect(await service.create(createBookingDto, user)).toEqual(booking);
    });
  });

  describe('findAll', () => {
    it('should return an array of bookings', async () => {
      const bookings = [
        {
          id: 'bookingId',
        },
        { id: 'anotherBookingId' },
      ] as Booking[];
      jest.spyOn(bookingRepository, 'find').mockResolvedValue(bookings);

      expect(await service.findAll()).toEqual(bookings);
    });
  });

  describe('findById', () => {
    it('should return a booking by id', async () => {
      const booking = { id: '66bf7fad02bc3e73ed79d2bd' } as Booking;
      jest.spyOn(bookingRepository, 'findOne').mockResolvedValue(booking);

      expect(await service.findById('66bf7fad02bc3e73ed79d2bd')).toEqual(
        booking,
      );
    });

    it('should throw NotFoundException if booking not found', async () => {
      jest.spyOn(bookingRepository, 'findOne').mockResolvedValue(null);

      await expect(
        service.findById('66bf7fad02bc3e73ed79d2bd'),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('cancel', () => {
    it('should cancel a booking if more than 24 hours old', async () => {
      const booking = {
        id: '66bf7fad02bc3e73ed79d2bd',
        bookedAt: new Date(Date.now() - 25 * 60 * 60 * 1000),
        car: { id: 'carId' },
      } as Booking;
      jest.spyOn(bookingRepository, 'findOne').mockResolvedValue(booking);
      jest
        .spyOn(carService, 'markCarAsAavailable')
        .mockResolvedValue(undefined);
      jest.spyOn(bookingRepository, 'remove').mockResolvedValue(undefined);

      await expect(
        service.cancel('66bf7fad02bc3e73ed79d2bd'),
      ).resolves.not.toThrow();
    });

    it('should throw ForbiddenException if booking is less than 24 hours old', async () => {
      const booking = {
        id: '66bf7fad02bc3e73ed79d2bd',
        bookedAt: new Date(Date.now() - 23 * 60 * 60 * 1000),
        car: { id: 'carId' },
      } as Booking;
      jest.spyOn(bookingRepository, 'findOne').mockResolvedValue(booking);

      await expect(service.cancel('66bf7fad02bc3e73ed79d2bd')).rejects.toThrow(
        ForbiddenException,
      );
    });
  });
});
