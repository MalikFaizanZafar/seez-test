"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomResponseInterceptor = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
class CustomResponseInterceptor {
    intercept(context, next) {
        const request = context.switchToHttp().getRequest();
        const response = context.switchToHttp().getResponse();
        const statusCode = response.statusCode;
        return next.handle().pipe((0, operators_1.map)((data) => ({
            statusCode,
            message: statusCode >= 400 ? 'Error' : 'Success',
            error: statusCode >= 400 ? response.message : null,
            timestamp: Date.now(),
            version: 'v2',
            path: request.url,
            data,
        })), (0, operators_1.catchError)((err) => {
            const statusCode = err instanceof common_1.HttpException ? err.getStatus() : 500;
            let errorResponse = {
                statusCode,
                message: err.message || 'Internal server error',
                error: err.name || 'Error',
                timestamp: new Date().toISOString(),
                version: 'v2',
                path: request.url,
                data: {},
            };
            if (err instanceof common_1.BadRequestException) {
                const validationErrors = err.getResponse();
                errorResponse = {
                    ...errorResponse,
                    message: validationErrors.message,
                    validationErrors: validationErrors.errors,
                };
            }
            return (0, rxjs_1.throwError)(() => new common_1.HttpException(errorResponse, statusCode));
        }));
    }
}
exports.CustomResponseInterceptor = CustomResponseInterceptor;
//# sourceMappingURL=response.interceptor.js.map