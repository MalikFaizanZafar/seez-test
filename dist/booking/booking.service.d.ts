import { Repository } from 'typeorm';
import { Booking } from './booking.entity';
import { BookingDto } from './booking.dto';
import { CarService } from '../car/car.service';
import { User } from '../auth/user.entity';
export declare class BookingService {
    private bookingRepository;
    private carService;
    constructor(bookingRepository: Repository<Booking>, carService: CarService);
    create(createBookingDto: BookingDto, user: Partial<User>): Promise<Booking>;
    findAll(): Promise<Booking[]>;
    findById(id: string): Promise<Booking>;
    cancel(id: string): Promise<void>;
}
