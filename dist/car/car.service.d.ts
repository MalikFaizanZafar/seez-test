import { Repository } from 'typeorm';
import { Car } from './car.entity';
import { CreateCarDto, FindCarsDto, PaginatedResponseDto, UpdateCarDto } from './car.dto';
export declare class CarService {
    private carRepository;
    constructor(carRepository: Repository<Car>);
    create(car: CreateCarDto): Promise<Car>;
    findAll(query: FindCarsDto): Promise<PaginatedResponseDto<Car>>;
    findById(id: string): Promise<Car>;
    update(id: string, updateCarDto: UpdateCarDto): Promise<Car>;
    remove(id: string): Promise<void>;
    save(car: Car): Promise<Car>;
    markCarAsUnavailable(id: string): Promise<Car>;
    markCarAsAavailable(id: string): Promise<void>;
}
