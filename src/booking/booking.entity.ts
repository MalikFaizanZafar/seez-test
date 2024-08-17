import { Entity, ObjectIdColumn, Column } from 'typeorm';
import { Car } from '../car/car.entity';
import { User } from '../auth/user.entity';

@Entity()
export class Booking {
  @ObjectIdColumn()
  id: string;

  @Column()
  car: Car;

  @Column()
  user: User;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column()
  bookedAt: Date;

  @Column({ default: false })
  cancelled: boolean;
}
