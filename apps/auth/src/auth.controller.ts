import { Response } from 'express';
import { Controller, Post, Res, UseGuards } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CurrentUser } from '@app/common';
import { UserDocument } from './users/models/user.schema';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Login as user' })
  @ApiBody({ type: LoginDto })
  @ApiTags('auth')
  @UseGuards(LocalAuthGuard)
  async login(
    @CurrentUser() user: UserDocument,
    @Res({ passthrough: true }) response: Response,
  ) {
    await this.authService.login(user, response);

    response.send(user);
  }

  @UseGuards(JwtAuthGuard)
  @MessagePattern('authenticate')
  async authenticate(@Payload() data: any) {
    return data.user;
  }
}

// {
//   "_id": "6654e5736a61f06524a9a0f3",
//   "email": "me@ericvandenberg.com",
//   "password": "$2a$10$iDSimAA54qH3Tlv83/0v8OstarECUrOjwnCAU88J2Ec6pdLtGfkwS"
// }

// {
//   "email": "me@ericvandenberg.com",
//   "password": "Password!123"
// }
