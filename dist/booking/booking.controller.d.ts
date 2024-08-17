import { BookingService } from './booking.service';
import { Booking } from './booking.entity';
import { BookingDto } from './booking.dto';
import { User } from '../auth/user.entity';
export declare class BookingController {
    private readonly bookingService;
    constructor(bookingService: BookingService);
    create(booking: BookingDto, user: User): Promise<Booking>;
    findOne(id: string): Promise<Booking>;
    cancel(id: string): Promise<void>;
}
