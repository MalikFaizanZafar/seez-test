import { Test, TestingModule } from '@nestjs/testing';
import {
  ConflictException,
  INestApplication,
  UnauthorizedException,
} from '@nestjs/common';
import * as request from 'supertest';

import { AppModule } from '../app.module';
import { AuthService } from './auth.service';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let authService: AuthService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    authService = moduleFixture.get<AuthService>(AuthService);
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /auth/register', () => {
    it('should register a new user and return access token', async () => {
      const registerDto = {
        username: 'newUser',
        password: 'password',
        isSuperUser: false,
      };

      jest.spyOn(authService, 'createUser').mockResolvedValue({
        user: {
          username: 'newUser',
          isSuperUser: false,
        },
        access_token: 'jwtToken',
      });

      return request(app.getHttpServer())
        .post('/auth/signup')
        .send(registerDto)
        .expect(201)
        .expect((response) => {
          expect(response.body).toHaveProperty('user');
          expect(response.body).toHaveProperty('access_token');
          expect(response.body.user.username).toBe(registerDto.username);
          expect(response.body.access_token).toBe('jwtToken');
        });
    });

    it('should register a new super user and return access token', async () => {
      const registerDto = {
        username: 'newUser',
        password: 'password',
        isSuperUser: true,
      };

      jest.spyOn(authService, 'createUser').mockResolvedValue({
        user: {
          username: 'newUser',
          isSuperUser: true,
        },
        access_token: 'jwtToken',
      });

      return request(app.getHttpServer())
        .post('/auth/signup')
        .send(registerDto)
        .expect(201)
        .expect((response) => {
          expect(response.body).toHaveProperty('user');
          expect(response.body).toHaveProperty('access_token');
          expect(response.body.user.username).toBe(registerDto.username);
          expect(response.body.user.isSuperUser).toBe(true);
          expect(response.body.access_token).toBe('jwtToken');
        });
    });

    it('should not allow duplicate username', async () => {
      const registerDto = {
        username: 'duplicateUser',
        password: 'password',
        isSuperUser: false,
      };

      jest
        .spyOn(authService, 'createUser')
        .mockRejectedValue(new ConflictException('User already exists'));

      return request(app.getHttpServer())
        .post('/auth/signup')
        .send(registerDto)
        .expect(409) // Conflict
        .expect((response) => {
          expect(response.body.message).toBe('User already exists');
        });
    });
  });

  describe('POST /auth/login', () => {
    it('should login with valid credentials and return access token', async () => {
      const password = 'password';
      const loginDto = { username: 'loginUser', password };

      jest.spyOn(authService, 'login').mockResolvedValue(
        Promise.resolve({
          user: {
            username: 'loginUser',
            isSuperUser: false,
          },
          access_token: 'jwtToken',
        }),
      );

      return request(app.getHttpServer())
        .post('/auth/login')
        .send(loginDto)
        .expect(201)
        .expect((response) => {
          expect(response.body).toHaveProperty('access_token');
          expect(response.body).toHaveProperty('user');
          expect(response.body.user.username).toBe(loginDto.username);
          expect(response.body.access_token).toBe('jwtToken');
        });
    });

    it('should return 401 for invalid credentials', async () => {
      const loginDto = {
        username: 'nonExistentUser',
        password: 'wrongPassword',
      };

      jest
        .spyOn(authService, 'login')
        .mockRejectedValue(new UnauthorizedException('Invalid Credentials'));

      return request(app.getHttpServer())
        .post('/auth/login')
        .send(loginDto)
        .expect(401) // Unauthorized
        .expect((response) => {
          expect(response.body.message).toBe('Invalid Credentials');
        });
    });
  });
});
