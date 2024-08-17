export declare class Car {
    id: string;
    make: string;
    model: string;
    year: number;
    mileage: number;
    price: number;
    available: boolean;
    numberOfBookings: number;
    isCarAvailable(): boolean;
    markCarAsUnavailable(): void;
    markCarAsAavailable(): void;
}
