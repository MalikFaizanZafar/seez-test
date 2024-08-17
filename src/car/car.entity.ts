import { Entity, ObjectIdColumn, Column, Index } from 'typeorm';

@Entity()
export class Car {
  @ObjectIdColumn()
  id: string;

  @Index({ fulltext: true }) // Indexing make field to make sure user can do full search on make of the car 
  @Column()
  make: string;

  @Index({ fulltext: true }) // Indexing model field to make sure user can do full search on model of the car
  @Column()
  model: string;

  @Column()
  year: number;

  @Column()
  mileage: number;

  @Column()
  price: number;

  @Column({ default: true })
  available: boolean = true;

  @Column({ default: 0 })
  numberOfBookings: number = 0;

  isCarAvailable() {
    return this.available;
  }

  markCarAsUnavailable() {
    this.available = false;
    this.numberOfBookings = this.numberOfBookings + 1;
  }

  markCarAsAavailable() {
    this.available = true;
  }
}
