import { AuthService } from './auth.service';
import { AuthResponseDto, LoginDto, SignupDto } from './user.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signup(signupDto: SignupDto): Promise<AuthResponseDto>;
    login(loginDto: LoginDto): Promise<AuthResponseDto>;
}
