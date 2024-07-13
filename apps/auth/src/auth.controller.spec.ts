import { Test, TestingModule } from '@nestjs/testing';
import { Response } from 'express';
import { UserDocument } from '@app/common';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let authController: AuthController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    authController = app.get<AuthController>(AuthController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(
        authController.login(
          {
            email: 'test@email.com',
            password: 'Password!123',
          } as UserDocument,
          {} as Response<any, Record<string, any>>,
        ),
      ).toBeTruthy();
    });
  });
});
