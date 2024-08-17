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
exports.BookingService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const mongodb_1 = require("mongodb");
const booking_entity_1 = require("./booking.entity");
const car_service_1 = require("../car/car.service");
let BookingService = class BookingService {
    constructor(bookingRepository, carService) {
        this.bookingRepository = bookingRepository;
        this.carService = carService;
    }
    async create(createBookingDto, user) {
        const { carId, startDate, endDate } = createBookingDto;
        const car = await this.carService.markCarAsUnavailable(carId);
        const booking = this.bookingRepository.create({
            car,
            user,
            startDate,
            endDate,
            bookedAt: new Date(),
        });
        return this.bookingRepository.save(booking);
    }
    async findAll() {
        return this.bookingRepository.find();
    }
    async findById(id) {
        const booking = await this.bookingRepository.findOne({
            where: { _id: new mongodb_1.ObjectId(id) },
        });
        if (!booking) {
            throw new common_1.NotFoundException(`Booking with ID ${id} not found`);
        }
        return booking;
    }
    async cancel(id) {
        const booking = await this.findById(id);
        const now = new Date();
        const bookingAge = now.getTime() - booking.bookedAt.getTime();
        const twentyFourHours = 24 * 60 * 60 * 1000;
        if (bookingAge < twentyFourHours) {
            throw new common_1.ForbiddenException('Booking cannot be canceled within the first 24 hours');
        }
        await this.carService.markCarAsAavailable(booking.car.id);
        await this.bookingRepository.remove(booking);
    }
};
exports.BookingService = BookingService;
exports.BookingService = BookingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(booking_entity_1.Booking)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        car_service_1.CarService])
], BookingService);
//# sourceMappingURL=booking.service.js.map