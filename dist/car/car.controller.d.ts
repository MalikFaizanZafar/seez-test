import { CarService } from './car.service';
import { Car } from './car.entity';
import { CreateCarDto, FindCarsDto, PaginatedResponseDto, UpdateCarDto } from './car.dto';
export declare class CarController {
    private readonly carService;
    constructor(carService: CarService);
    create(car: CreateCarDto): Promise<Car>;
    findAll(query: FindCarsDto): Promise<PaginatedResponseDto<Car>>;
    findOne(id: string): Promise<Car>;
    update(id: string, updateCarDto: UpdateCarDto): Promise<Car>;
    remove(id: string): Promise<void>;
}
