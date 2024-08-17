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
exports.CarController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const car_service_1 = require("./car.service");
const car_entity_1 = require("./car.entity");
const user_guard_1 = require("../auth/user.guard");
const super_user_guard_1 = require("../auth/super-user.guard");
const car_dto_1 = require("./car.dto");
let CarController = class CarController {
    constructor(carService) {
        this.carService = carService;
    }
    create(car) {
        return this.carService.create(car);
    }
    findAll(query) {
        return this.carService.findAll(query);
    }
    async findOne(id) {
        return this.carService.findById(id);
    }
    async update(id, updateCarDto) {
        return this.carService.update(id, updateCarDto);
    }
    async remove(id) {
        return this.carService.remove(id);
    }
};
exports.CarController = CarController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(user_guard_1.UserGuard, super_user_guard_1.SuperUserGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Create Car' }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Created Succesfully',
        type: car_entity_1.Car,
        isArray: false,
        example: {
            id: '66bee3dd71e608b7590ae586',
            make: 'Toyota',
            model: 'Fortuner Legender EE',
            year: 2020,
            mileage: 22233,
            price: 223443,
            available: true,
        },
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [car_dto_1.CreateCarDto]),
    __metadata("design:returntype", Promise)
], CarController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(user_guard_1.UserGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Get Cars' }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Get Cars Succesfully',
        type: car_dto_1.PaginatedResponseDto,
        isArray: false,
        example: {
            payload: [
                {
                    id: '66bee3dd71e608b7590ae586',
                    make: 'Toyota',
                    model: 'Fortuner Legender EE',
                    year: 2020,
                    mileage: 22233,
                    price: 223443,
                    available: true,
                    numberOfBookings: 0,
                },
                {
                    id: '66bee3dd71e608b7590ae586',
                    make: 'Honda',
                    model: 'Civic',
                    year: 2020,
                    mileage: 22233,
                    price: 223443,
                    available: true,
                    numberOfBookings: 0,
                },
            ],
            total: 2,
            page: 1,
            limit: 10,
        },
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [car_dto_1.FindCarsDto]),
    __metadata("design:returntype", Promise)
], CarController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(user_guard_1.UserGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Get Car' }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Get Car Succesfully',
        type: car_entity_1.Car,
        isArray: false,
        example: {
            id: '66bee3dd71e608b7590ae586',
            make: 'Toyota',
            model: 'Fortuner Legender EE',
            year: 2020,
            mileage: 22233,
            price: 223443,
            available: true,
            numberOfBookings: 0,
        },
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CarController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(user_guard_1.UserGuard, super_user_guard_1.SuperUserGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Update Car' }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Update Car Succesfully',
        type: car_entity_1.Car,
        isArray: false,
        example: {
            id: '66bee3dd71e608b7590ae586',
            make: 'Toyota',
            model: 'Fortuner Legender EE',
            year: 2020,
            mileage: 22233,
            price: 223443,
            available: true,
            numberOfBookings: 0,
        },
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, car_dto_1.UpdateCarDto]),
    __metadata("design:returntype", Promise)
], CarController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(user_guard_1.UserGuard, super_user_guard_1.SuperUserGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Delete Car' }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Delete Car Succesfully',
        isArray: false,
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CarController.prototype, "remove", null);
exports.CarController = CarController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiTags)('cars'),
    (0, common_1.Controller)('cars'),
    __metadata("design:paramtypes", [car_service_1.CarService])
], CarController);
//# sourceMappingURL=car.controller.js.map