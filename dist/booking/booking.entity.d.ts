import { Car } from '../car/car.entity';
import { User } from '../auth/user.entity';
export declare class Booking {
    id: string;
    car: Car;
    user: User;
    startDate: Date;
    endDate: Date;
    bookedAt: Date;
    cancelled: boolean;
}
