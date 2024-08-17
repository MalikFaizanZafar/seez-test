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
exports.Booking = void 0;
const typeorm_1 = require("typeorm");
const car_entity_1 = require("../car/car.entity");
const user_entity_1 = require("../auth/user.entity");
let Booking = class Booking {
};
exports.Booking = Booking;
__decorate([
    (0, typeorm_1.ObjectIdColumn)(),
    __metadata("design:type", String)
], Booking.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", car_entity_1.Car)
], Booking.prototype, "car", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", user_entity_1.User)
], Booking.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Booking.prototype, "startDate", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Booking.prototype, "endDate", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Booking.prototype, "bookedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Booking.prototype, "cancelled", void 0);
exports.Booking = Booking = __decorate([
    (0, typeorm_1.Entity)()
], Booking);
//# sourceMappingURL=booking.entity.js.map