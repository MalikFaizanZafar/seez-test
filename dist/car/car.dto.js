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
exports.PaginatedResponseDto = exports.FindCarsDto = exports.UpdateCarDto = exports.CreateCarDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateCarDto {
}
exports.CreateCarDto = CreateCarDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'Make of the car',
        default: 'Toyota',
    }),
    __metadata("design:type", String)
], CreateCarDto.prototype, "make", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'Model of the car',
        default: 'Corolla',
    }),
    __metadata("design:type", String)
], CreateCarDto.prototype, "model", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, swagger_1.ApiProperty)({
        type: Number,
        description: 'Year of the car',
        default: 2024,
    }),
    __metadata("design:type", Number)
], CreateCarDto.prototype, "year", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, swagger_1.ApiProperty)({
        type: Number,
        description: 'Mileage of the car',
        default: 10000,
    }),
    __metadata("design:type", Number)
], CreateCarDto.prototype, "mileage", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, swagger_1.ApiProperty)({
        type: Number,
        description: 'Price of the car',
        default: 5000000,
    }),
    __metadata("design:type", Number)
], CreateCarDto.prototype, "price", void 0);
class UpdateCarDto {
}
exports.UpdateCarDto = UpdateCarDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'Make of the car',
        default: 'Toyota',
    }),
    __metadata("design:type", String)
], UpdateCarDto.prototype, "make", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'Model of the car',
        default: 'Corolla',
    }),
    __metadata("design:type", String)
], UpdateCarDto.prototype, "model", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'Year of the car',
        default: 2024,
    }),
    __metadata("design:type", Number)
], UpdateCarDto.prototype, "year", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'Mileage of the car',
        default: 10000,
    }),
    __metadata("design:type", Number)
], UpdateCarDto.prototype, "mileage", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'Price of the car',
        default: 5000000,
    }),
    __metadata("design:type", Number)
], UpdateCarDto.prototype, "price", void 0);
class FindCarsDto {
    constructor() {
        this.page = 1;
        this.limit = 10;
    }
}
exports.FindCarsDto = FindCarsDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], FindCarsDto.prototype, "page", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], FindCarsDto.prototype, "limit", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FindCarsDto.prototype, "search", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FindCarsDto.prototype, "make", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FindCarsDto.prototype, "model", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], FindCarsDto.prototype, "fromYear", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], FindCarsDto.prototype, "toYear", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], FindCarsDto.prototype, "fromMileage", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], FindCarsDto.prototype, "toMileage", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], FindCarsDto.prototype, "fromPrice", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], FindCarsDto.prototype, "toPrice", void 0);
class PaginatedResponseDto {
}
exports.PaginatedResponseDto = PaginatedResponseDto;
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], PaginatedResponseDto.prototype, "total", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], PaginatedResponseDto.prototype, "page", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], PaginatedResponseDto.prototype, "limit", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], PaginatedResponseDto.prototype, "payload", void 0);
//# sourceMappingURL=car.dto.js.map