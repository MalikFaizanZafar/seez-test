import { Controller, Post, Body } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiCreatedResponse } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { AuthResponseDto, LoginDto, SignupDto } from './user.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiOperation({ summary: 'Create User' })
  @ApiCreatedResponse({
    description: 'Created Succesfully',
    type: AuthResponseDto,
    isArray: false,
    example: {
      user: {
        username: 'seez_user',
        isSuperUser: false,
      },
      access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNlZXpfdXNlcjEiLCJzdWIiOiI2NmMwNTUyMjViZjAzZmU2YWMyYmZhZjgiLCJpc1N1cGVyVXNlciI6ZmFsc2UsImlhdCI6MTcyMzg4MDczOCwiZXhwIjoxNzIzODg0MzM4fQ.tzbFjWKoIJ8vnZ24yKLC3pM5AfvjkoxApnswD_FE4oY'
    },
  })
  async signup(@Body() signupDto: SignupDto) {
    return this.authService.createUser(signupDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login User' })
  @ApiCreatedResponse({
    description: 'Login Succesfully',
    type: AuthResponseDto,
    isArray: false,
    example: {
      user: {
        username: 'seez_user',
        isSuperUser: false,
      },
      access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNlZXpfdXNlcjEiLCJzdWIiOiI2NmMwNTUyMjViZjAzZmU2YWMyYmZhZjgiLCJpc1N1cGVyVXNlciI6ZmFsc2UsImlhdCI6MTcyMzg4MDczOCwiZXhwIjoxNzIzODg0MzM4fQ.tzbFjWKoIJ8vnZ24yKLC3pM5AfvjkoxApnswD_FE4oY'
    },
  })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
