import { Controller, Post, Body } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiCreatedResponse } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { AuthResponseDto, SignupDto } from './user.dto';

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
      username: 'seez_user',
      password: 'password',
      isSuperUser: false,
    },
  })
  async signup(@Body() signupDto: SignupDto) {
    return this.authService.createUser(signupDto);
  }
}
