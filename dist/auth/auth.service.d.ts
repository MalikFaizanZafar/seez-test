import { Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthResponseDto, LoginDto, SignupDto } from './user.dto';
export declare class AuthService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    createUser(signupDto: SignupDto): Promise<AuthResponseDto>;
    private _validateUser;
    login(loginDto: LoginDto): Promise<Promise<AuthResponseDto>>;
}
