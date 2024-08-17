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
exports.AuthResponseDto = exports.LoginDto = exports.SignupDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class SignupDto {
}
exports.SignupDto = SignupDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(5, { message: 'username must be at least 5 characters long' }),
    (0, class_validator_1.MaxLength)(15, { message: 'username must be at max 15 characters long' }),
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'username is a required property',
        default: 'seez_user',
    }),
    __metadata("design:type", String)
], SignupDto.prototype, "username", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'password must not be empty' }),
    (0, class_validator_1.MinLength)(6, { message: 'password must be at least 6 characters long' }),
    (0, class_validator_1.MaxLength)(15, { message: 'password must be at max 15 characters long' }),
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'password is a required property',
        default: 'password',
    }),
    __metadata("design:type", String)
], SignupDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, swagger_1.ApiProperty)({
        type: Boolean,
        description: 'isSuperUser is a required property',
        default: false,
    }),
    __metadata("design:type", Boolean)
], SignupDto.prototype, "isSuperUser", void 0);
class LoginDto {
}
exports.LoginDto = LoginDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(5, { message: 'username must be at least 5 characters long' }),
    (0, class_validator_1.MaxLength)(15, { message: 'username must be at max 15 characters long' }),
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'username is a required property',
        default: 'faizanzafar',
    }),
    __metadata("design:type", String)
], LoginDto.prototype, "username", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'password must not be empty' }),
    (0, class_validator_1.MinLength)(6, { message: 'password must be at least 6 characters long' }),
    (0, class_validator_1.MaxLength)(15, { message: 'password must be at max 15 characters long' }),
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'password is a required property',
        default: 'password',
    }),
    __metadata("design:type", String)
], LoginDto.prototype, "password", void 0);
class AuthResponseDto {
}
exports.AuthResponseDto = AuthResponseDto;
//# sourceMappingURL=user.dto.js.map