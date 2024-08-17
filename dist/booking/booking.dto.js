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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingResponseDto = exports.BookingDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
class BookingDto {
}
exports.BookingDto = BookingDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'Id of the car',
        default: '66bee3dd71e608b7590ae586',
    }),
    __metadata("design:type", String)
], BookingDto.prototype, "carId", void 0);
__decorate([
    (0, class_validator_1.IsDate)({ message: 'Invalid value for date' }),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.MinDate)(new Date()),
    (0, swagger_1.ApiProperty)({
        type: Date,
        description: 'Start Date of booking',
        default: '2024-08-08T08:14:00',
    }),
    __metadata("design:type", Date)
], BookingDto.prototype, "startDate", void 0);
__decorate([
    (0, class_validator_1.IsDate)({ message: 'Invalid value for date' }),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.MinDate)(new Date()),
    (0, swagger_1.ApiProperty)({
        type: Date,
        description: 'End Date of booking',
        default: '2024-09-09T08:14:00',
    }),
    __metadata("design:type", Date)
], BookingDto.prototype, "endDate", void 0);
class BookingResponseDto {
}
exports.BookingResponseDto = BookingResponseDto;
//# sourceMappingURL=booking.dto.js.map