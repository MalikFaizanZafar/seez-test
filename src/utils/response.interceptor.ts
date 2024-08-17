import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  BadRequestException,
} from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export class CustomResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const statusCode = response.statusCode;
    return next.handle().pipe(
      map((data) => ({
        statusCode,
        message: statusCode >= 400 ? 'Error' : 'Success',
        error: statusCode >= 400 ? response.message : null,
        timestamp: Date.now(),
        version: 'v2',
        path: request.url,
        data,
      })),
      catchError((err) => {
        const statusCode = err instanceof HttpException ? err.getStatus() : 500;

        let errorResponse: any = {
          statusCode,
          message: err.message || 'Internal server error',
          error: err.name || 'Error',
          timestamp: new Date().toISOString(),
          version: 'v2',
          path: request.url,
          data: {},
        };

        if (err instanceof BadRequestException) {
          // Assuming validation errors come in a certain format
          const validationErrors = err.getResponse() as {
            message: string;
            errors: ValidationError[];
          };

          errorResponse = {
            ...errorResponse,
            message: validationErrors.message,
            validationErrors: validationErrors.errors, // Attach detailed validation errors
          };
        }

        return throwError(() => new HttpException(errorResponse, statusCode));
      }),
    );
  }
}
