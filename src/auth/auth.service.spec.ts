import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import {
  ConflictException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { User } from './user.entity';
import { LoginDto, SignupDto } from './user.dto';

describe('AuthService', () => {
  let service: AuthService;
  let userRepository: Repository<User>;

  beforeAll(() => {
    // Set the JWT secret for testing
    process.env.JWT_SECRET = 'testSecretKey';
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('signup', () => {
    it('should create a new user and return access token', async () => {
      const signupDto: SignupDto = {
        username: 'newUser',
        password: 'password',
        isSuperUser: false,
      };
      const hashedPassword = bcrypt.hashSync(signupDto.password, 10);
      const newUser = {
        id: 'userId',
        ...signupDto,
        password: hashedPassword,
      } as User;

      jest.spyOn(userRepository, 'findOne').mockResolvedValue(null); // No existing user
      jest.spyOn(userRepository, 'create').mockReturnValue(newUser);
      jest.spyOn(userRepository, 'save').mockResolvedValue(newUser);
      jest.spyOn(jwt, 'sign').mockReturnValue();

      const result = await service.createUser(signupDto);

      expect(result).toEqual({
        user: {
          username: 'newUser',
          isSuperUser: false,
        },
        access_token: jwt.sign(
          {
            username: newUser.username,
            sub: newUser.id,
            isSuperUser: newUser.isSuperUser,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: '1h',
          },
        ),
      });
    });

    it('should throw ConflictException if user already exists', async () => {
      const signupDto: SignupDto = {
        username: 'existingUser',
        password: 'password',
        isSuperUser: false,
      };
      const existingUser = {
        id: 'userId',
        username: 'existingUser',
        password: 'hashedPassword',
      } as User;

      jest.spyOn(userRepository, 'findOne').mockResolvedValue(existingUser);

      await expect(service.createUser(signupDto)).rejects.toThrow(
        ConflictException,
      );
    });
  });

  describe('login', () => {
    it('should return access token and user data on successful login', async () => {
      const loginDto: LoginDto = { username: 'testUser', password: 'password' };
      const user = {
        id: 'userId',
        username: 'testUser',
        password: bcrypt.hashSync('password', 10),
        isSuperUser: false,
      } as User;

      jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);
      jest.spyOn(bcrypt, 'compareSync').mockReturnValue(true);
      jest.spyOn(jwt, 'sign').mockReturnValue();

      const result = await service.login(loginDto);

      expect(result).toEqual({
        user: {
          username: 'testUser',
          isSuperUser: false,
        },
        access_token: jwt.sign(
          {
            username: user.username,
            sub: user.id,
            isSuperUser: user.isSuperUser,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: '1h',
          },
        ),
      });
    });

    it('should throw UnauthorizedException if user is not found', async () => {
      const loginDto: LoginDto = { username: 'testUser', password: 'password' };

      jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);

      await expect(service.login(loginDto)).rejects.toThrow(NotFoundException);
    });

    it('should throw UnauthorizedException if password is incorrect', async () => {
      const loginDto: LoginDto = { username: 'testUser', password: 'password' };
      const user = {
        id: 'userId',
        username: 'testUser',
        password: bcrypt.hashSync('wrongPassword', 10),
        isSuperUser: false,
      } as User;

      jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);
      jest.spyOn(bcrypt, 'compareSync').mockReturnValue(false);

      await expect(service.login(loginDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });
});
