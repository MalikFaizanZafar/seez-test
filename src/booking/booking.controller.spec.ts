import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { BookingController } from '../booking/booking.controller';
import { BookingService } from '../booking/booking.service';
import { AuthService } from '../auth/auth.service';
import { BookingDto, BookingResponseDto } from '../booking/booking.dto';
import { Booking } from '../booking/booking.entity';
import { User } from '../auth/user.entity';
import { Car } from '../car/car.entity';

// Mock data
const mockBooking: Booking = {
  id: 'booking-id',
  car: {
    id: 'car-id',
    make: 'Toyota',
    model: 'Aqua',
    year: 2020,
    mileage: 22233,
    price: 223443,
    available: false,
  } as Car,
  user: {
    id: 'user-id',
    username: 'testuser',
    isSuperUser: false,
  } as User,
  startDate: new Date('2024-08-18T08:14:00'),
  endDate: new Date('2024-08-21T08:14:00'),
  bookedAt: new Date(),
  cancelled: false,
};

// Mock BookingService
const mockBookingService = {
  create: jest.fn().mockResolvedValue(mockBooking),
  findById: jest.fn().mockResolvedValue(mockBooking),
  cancel: jest.fn().mockResolvedValue(undefined),
};

// Mock AuthService
const mockAuthService = {
  login: jest.fn().mockResolvedValue({ accessToken: 'test-valid-token' }), // Adjust if needed
};

describe('BookingController (e2e)', () => {
  let controller: BookingController;
  let service: BookingService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookingController],
      providers: [
        { provide: BookingService, useValue: mockBookingService },
      ],
    }).compile();

    controller = module.get<BookingController>(BookingController);
    service = module.get<BookingService>(BookingService);
  });

  describe('BookingController', () => {
    it('should create a booking', async () => {
      const bookingDto: BookingDto = {
        carId: 'car-id',
        startDate: new Date('2024-08-18T08:14:00'),
        endDate: new Date('2024-08-21T08:14:00'),
      };

      jest.spyOn(service, 'create').mockResolvedValue(mockBooking);
  
      expect(await controller.create(bookingDto, { username: 'faizanzafar', password: 'password'} as User)).toEqual(mockBooking);
    });

    it('should retrieve a booking by ID', async () => {
      const id = 'booking-id';
  
      jest.spyOn(service, 'findById').mockResolvedValue(mockBooking);
  
      expect(await controller.findOne(id)).toEqual(mockBooking);
    });

    it('should cancel a booking', async () => {
      const bookingId = 'booking-id';

      jest.spyOn(service, 'cancel').mockResolvedValue();

      expect(controller.cancel(bookingId)).resolves.toBeUndefined();
    });
  });
});
