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
exports.BookingController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const booking_service_1 = require("./booking.service");
const booking_dto_1 = require("./booking.dto");
const user_decorator_1 = require("../auth/user.decorator");
const user_entity_1 = require("../auth/user.entity");
const user_guard_1 = require("../auth/user.guard");
let BookingController = class BookingController {
    constructor(bookingService) {
        this.bookingService = bookingService;
    }
    create(booking, user) {
        return this.bookingService.create(booking, user);
    }
    findOne(id) {
        return this.bookingService.findById(id);
    }
    cancel(id) {
        return this.bookingService.cancel(id);
    }
};
exports.BookingController = BookingController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(user_guard_1.UserGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Create Booking' }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Booking Created Succesfully',
        type: booking_dto_1.BookingResponseDto,
        isArray: false,
        example: {
            car: {
                id: '66bf6c040135859b0ea22231',
                make: 'Toyota',
                model: 'Aqua',
                year: 2020,
                mileage: 22233,
                price: 223443,
                available: false,
            },
            user: {
                id: '66bf31f6c91b815940fe40d2',
                username: 'faizanzafar',
                isSuperUser: false,
            },
            startDate: '2024-08-18T08:14:00',
            endDate: '2024-08-21T08:14:00',
            bookedAt: '2024-08-16T15:11:12.235Z',
            id: '66bf6c100135859b0ea22232',
        },
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [booking_dto_1.BookingDto,
        user_entity_1.User]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(user_guard_1.UserGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Get Booking' }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Get Booking Succesfully',
        type: booking_dto_1.BookingResponseDto,
        isArray: false,
        example: {
            car: {
                id: '66bf6c040135859b0ea22231',
                make: 'Toyota',
                model: 'Aqua',
                year: 2020,
                mileage: 22233,
                price: 223443,
                available: false,
            },
            user: {
                id: '66bf31f6c91b815940fe40d2',
                username: 'faizanzafar',
                isSuperUser: false,
            },
            startDate: '2024-08-18T08:14:00',
            endDate: '2024-08-21T08:14:00',
            bookedAt: '2024-08-16T15:11:12.235Z',
            id: '66bf6c100135859b0ea22232',
        },
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "findOne", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(user_guard_1.UserGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Cancel Booking' }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Booking cancelled Succesfully',
        isArray: false,
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "cancel", null);
exports.BookingController = BookingController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiTags)('bookings'),
    (0, common_1.Controller)('bookings'),
    __metadata("design:paramtypes", [booking_service_1.BookingService])
], BookingController);
//# sourceMappingURL=booking.controller.js.map