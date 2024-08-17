"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const mongodb_1 = require("mongodb");
const car_entity_1 = require("./car.entity");
let CarService = class CarService {
    constructor(carRepository) {
        this.carRepository = carRepository;
    }
    create(car) {
        return this.carRepository.save(car);
    }
    async findAll(query) {
        const { make, model, fromYear, toYear, fromPrice, toPrice, fromMileage, toMileage, search, page = 1, limit = 10, } = query;
        const where = {};
        if (search) {
            where['$text'] = { $search: search };
        }
        else {
            if (make)
                where['make'] = make;
            if (model)
                where['model'] = model;
            if (fromYear && toYear) {
                where['year'] = { $gte: Number(fromYear), $lte: Number(toYear) };
            }
            else if (fromYear) {
                where['year'] = { $gte: Number(fromYear) };
            }
            else if (toYear) {
                where['year'] = { $lte: Number(toYear) };
            }
            if (fromPrice && toPrice) {
                where['price'] = { $gte: Number(fromPrice), $lte: Number(toPrice) };
            }
            else if (fromPrice) {
                where['price'] = { $gte: Number(fromPrice) };
            }
            else if (toPrice) {
                where['price'] = { $lte: Number(toPrice) };
            }
            if (fromMileage && toMileage) {
                where['mileage'] = {
                    $gte: Number(fromMileage),
                    $lte: Number(toMileage),
                };
            }
            else if (fromMileage) {
                where['mileage'] = { $gte: Number(fromMileage) };
            }
            else if (toMileage) {
                where['mileage'] = { $lte: Number(toMileage) };
            }
        }
        const [cars, total] = await this.carRepository.findAndCount({
            where,
            take: Number(limit),
            skip: (page - 1) * limit,
            order: {
                numberOfBookings: 'DESC',
            },
        });
        const response = {
            payload: cars,
            total,
            page,
            limit,
        };
        return response;
    }
    async findById(id) {
        const car = await this.carRepository.findOne({
            where: { _id: new mongodb_1.ObjectId(id) },
        });
        if (!car) {
            throw new common_1.NotFoundException(`Car with ID ${id} not found`);
        }
        return car;
    }
    async update(id, updateCarDto) {
        const car = await this.findById(id);
        Object.assign(car, updateCarDto);
        return this.carRepository.save(car);
    }
    async remove(id) {
        const car = await this.findById(id);
        await this.carRepository.remove(car);
    }
    save(car) {
        return this.carRepository.save(car);
    }
    async markCarAsUnavailable(id) {
        const car = await this.findById(id);
        if (!car.isCarAvailable()) {
            throw new Error(`Car is not available for booking`);
        }
        car.markCarAsUnavailable();
        await this.save(car);
        return car;
    }
    async markCarAsAavailable(id) {
        const car = await this.findById(id);
        car.markCarAsAavailable();
        await this.save(car);
    }
};
exports.CarService = CarService;
exports.CarService = CarService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(car_entity_1.Car)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CarService);
//# sourceMappingURL=car.service.js.map