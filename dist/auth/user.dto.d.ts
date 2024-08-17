import { User } from './user.entity';
export declare class SignupDto {
    username: string;
    password: string;
    isSuperUser: boolean;
}
export declare class LoginDto {
    username: string;
    password: string;
}
export declare class AuthResponseDto {
    user: Partial<User>;
    access_token: string;
}
