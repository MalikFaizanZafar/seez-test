import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

import { CarService } from './car.service';
import { Car } from './car.entity';
import {
  CreateCarDto,
  UpdateCarDto,
  FindCarsDto,
  PaginatedResponseDto,
} from './car.dto';

describe('CarService', () => {
  let service: CarService;
  let repository: Repository<Car>;

  const mockCarRepository = () => ({
    save: jest.fn(),
    findAndCount: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
    // You can add more mocks here if needed
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CarService,
        { provide: getRepositoryToken(Car), useValue: mockCarRepository() },
      ],
    }).compile();

    service = module.get<CarService>(CarService);
    repository = module.get<Repository<Car>>(getRepositoryToken(Car));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a car', async () => {
      const createCarDto: CreateCarDto = {
        make: 'Toyota',
        model: 'Corolla',
        price: 20000,
        year: 2020,
        mileage: 15000,
        // other properties...
      };

      const savedCar = { ...createCarDto, id: 'some-id' };
      jest.spyOn(repository, 'save').mockResolvedValue(savedCar as Car);

      expect(await service.create(createCarDto)).toEqual(savedCar);
    });
  });

  describe('findAll', () => {
    it('should return paginated cars', async () => {
      const findCarsDto: FindCarsDto = {
        page: 1,
        limit: 10,
        fromYear: 2020,
        toYear: 2022,
        fromPrice: 15000,
        toPrice: 25000,
        fromMileage: 0,
        toMileage: 20000,
      };
      const cars = [
        {
          make: 'Toyota',
          model: 'Corolla',
          year: 2022,
          price: 20000,
          mileage: 10000,
        } as Car,
        {
          make: 'Honda',
          model: 'Civic',
          year: 2021,
          price: 22000,
          mileage: 5000,
        } as Car,
      ];
      const total = 1;
      jest.spyOn(repository, 'findAndCount').mockResolvedValue([cars, total]);

      const result: PaginatedResponseDto<Car> = {
        payload: cars,
        total,
        page: 1,
        limit: 10,
      };

      expect(await service.findAll(findCarsDto)).toEqual(result);
    });
  });

  describe('findById', () => {
    it('should find a car by id', async () => {
      const id = '66bf7eeb02bc3e73ed79d2b4';
      const car = { id } as Car;
      jest.spyOn(repository, 'findOne').mockResolvedValue(car);

      expect(await service.findById(id)).toEqual(car);
    });

    it('should throw NotFoundException if car not found', async () => {
      const id = '66bf7eeb02bc3e73ed79d2b1';
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      await expect(service.findById(id)).rejects.toThrow(
        new NotFoundException(`Car with ID ${id} not found`),
      );
    });
  });

  describe('update', () => {
    it('should update a car', async () => {
      const id = 'some-id';
      const updateCarDto: UpdateCarDto = { price: 22000 };
      const car = { id, price: 20000 } as Car;
      const updatedCar = { ...car, ...updateCarDto } as Car;

      jest.spyOn(service, 'findById').mockResolvedValue(car);
      jest.spyOn(repository, 'save').mockResolvedValue(updatedCar);

      expect(await service.update(id, updateCarDto)).toEqual(updatedCar);
    });
  });

  describe('remove', () => {
    it('should remove a car', async () => {
      const id = 'some-id';
      const car = { id } as Car;
      jest.spyOn(service, 'findById').mockResolvedValue(car);
      jest.spyOn(repository, 'remove').mockResolvedValue(undefined);

      await expect(service.remove(id)).resolves.not.toThrow();
    });
  });

  describe('markCarAsUnavailable', () => {
    it('should mark a car as unavailable', async () => {
      const id = '66bf7eeb02bc3e73ed79d2b4';
      const car = {
        id,
        isAvailable: true,
        isCarAvailable: jest.fn().mockReturnValueOnce(true),
        markCarAsUnavailable: jest.fn(() => {
          car.isAvailable = false;
        }),
      } as any;
      jest.spyOn(service, 'findById').mockResolvedValue(car);
      jest
        .spyOn(service, 'save')
        .mockResolvedValue({ ...car, isAvailable: false });

      expect(await service.markCarAsUnavailable(id)).toEqual({
        ...car,
        isAvailable: false,
      });
    });

    it('should throw an error if car is not available', async () => {
      const id = '66bf7eeb02bc3e73ed79d2b4';
      const car = {
        id,
        isAvailable: false,
        isCarAvailable: jest.fn(),
      } as any;
      jest.spyOn(service, 'findById').mockResolvedValue(car);

      await expect(service.markCarAsUnavailable(id)).rejects.toThrow(
        new Error(`Car is not available for booking`),
      );
    });
  });

  describe('markCarAsAavailable', () => {
    it('should mark a car as available', async () => {
      const id = 'some-id';
      const car = {
        id,
        isAvailable: false,
        markCarAsAavailable: jest.fn(),
      } as any;
      jest.spyOn(service, 'findById').mockResolvedValue(car);
      jest
        .spyOn(service, 'save')
        .mockResolvedValue({ ...car, isAvailable: true });

      await expect(service.markCarAsAavailable(id)).resolves.not.toThrow();
    });
  });
});
