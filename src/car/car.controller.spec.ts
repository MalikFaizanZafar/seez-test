import { Test, TestingModule } from '@nestjs/testing';
import { CarController } from './car.controller';
import { CarService } from './car.service';
import { Car } from './car.entity';
import { CreateCarDto, FindCarsDto, PaginatedResponseDto, UpdateCarDto } from './car.dto';

describe('CarController', () => {
  let controller: CarController;
  let service: CarService;

  const mockCarService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarController],
      providers: [
        { provide: CarService, useValue: mockCarService },
      ],
    }).compile();

    controller = module.get<CarController>(CarController);
    service = module.get<CarService>(CarService);
  });

  describe('create', () => {
    it('should create a car', async () => {
      const createCarDto: CreateCarDto = {
        make: 'Toyota',
        model: 'Fortuner',
        year: 2020,
        mileage: 10000,
        price: 20000,
      };
  
      const result: Car = { id: '1', ...createCarDto } as Car;
  
      jest.spyOn(service, 'create').mockResolvedValue(result);
  
      expect(await controller.create(createCarDto)).toEqual(result);
    });
  });

  describe('findAll', () => {
    it('should return a paginated list of cars', async () => {
      const query: FindCarsDto = { page: 1, limit: 10 };
      const result = {
        payload: [
          { id: '1', make: 'Toyota', model: 'Fortuner', year: 2020, mileage: 10000, price: 20000, available: true, numberOfBookings: 0 },
        ],
        total: 1,
        page: 1,
        limit: 10,
      } as PaginatedResponseDto<Car>;
  
      jest.spyOn(service, 'findAll').mockResolvedValue(result);
  
      expect(await controller.findAll(query)).toEqual(result);
    });
  });
  
  describe('findOne', () => {
    it('should return a car by ID', async () => {
      const id = '1';
      const result: Car = { 
        id, 
        make: 'Toyota', 
        model: 'Fortuner', 
        year: 2020, 
        mileage: 10000, 
        price: 20000, 
        available: true, 
        numberOfBookings: 0,
       } as Car;
  
      jest.spyOn(service, 'findById').mockResolvedValue(result);
  
      expect(await controller.findOne(id)).toEqual(result);
    });
  });
  
  describe('update', () => {
    it('should update a car', async () => {
      const id = '1';
      const updateCarDto: UpdateCarDto = { price: 25000 };
      const result: Car = { id, 
        make: 'Toyota', 
        model: 'Fortuner', 
        year: 2020, 
        mileage: 10000, 
        price: 25000, 
        available: true, 
        numberOfBookings: 0,
      } as Car;
  
      jest.spyOn(service, 'update').mockResolvedValue(result);
  
      expect(await controller.update(id, updateCarDto)).toEqual(result);
    });   
  });

  describe('remove', () => {
    it('should remove a car', async () => {
      const id = '1';
      jest.spyOn(service, 'remove').mockResolvedValue(undefined);
  
      await expect(controller.remove(id)).resolves.toBeUndefined();
    });
  }); 
  
});
