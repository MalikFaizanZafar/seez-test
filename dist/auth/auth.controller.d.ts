import { AuthService } from './auth.service';
import { AuthResponseDto, SignupDto } from './user.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signup(signupDto: SignupDto): Promise<AuthResponseDto>;
}
