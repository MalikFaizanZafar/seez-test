import { Car } from '../car/car.entity';
import { User } from '../auth/user.entity';
export declare class BookingDto {
    carId: string;
    startDate: Date;
    endDate: Date;
}
export declare class BookingResponseDto {
    id: string;
    car: Partial<Car>;
    user: Partial<User>;
    startDate: Date;
    endDate: Date;
    bookedAt: Date;
}
