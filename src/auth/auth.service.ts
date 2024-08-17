import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

import { User } from './user.entity';
import { AuthResponseDto, SignupDto } from './user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(signupDto: SignupDto): Promise<AuthResponseDto> {
    const { username, password, isSuperUser } = signupDto;
    // Check if user already exists
    const existingUser = await this.userRepository.findOne({
      where: { username },
    });

    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    // Hash the password before saving
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Create and save the new user
    const newUser = this.userRepository.create({
      username,
      password: hashedPassword,
      isSuperUser,
    });

    await this.userRepository.save(newUser);

    const payload = {
      username: newUser.username,
      sub: newUser.id,
      isSuperUser: newUser.isSuperUser,
    };

    return {
      user: {
        username: newUser.username,
        isSuperUser: newUser.isSuperUser,
      },
      access_token: jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '1h',
      }),
    } as AuthResponseDto;
  }
}
