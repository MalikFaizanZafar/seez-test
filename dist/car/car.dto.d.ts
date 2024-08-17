export declare class CreateCarDto {
    make: string;
    model: string;
    year: number;
    mileage: number;
    price: number;
}
export declare class UpdateCarDto {
    make?: string;
    model?: string;
    year?: number;
    mileage?: number;
    price?: number;
}
export declare class FindCarsDto {
    page?: number;
    limit?: number;
    search?: string;
    make?: string;
    model?: string;
    fromYear?: number;
    toYear?: number;
    fromMileage?: number;
    toMileage?: number;
    fromPrice?: number;
    toPrice?: number;
}
export declare class PaginatedResponseDto<T> {
    total?: number;
    page?: number;
    limit?: number;
    payload: T[];
}
