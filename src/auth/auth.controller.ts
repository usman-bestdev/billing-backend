import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { Response } from 'express';
import { User } from 'src/validator/user.validator';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('login')
  async login(
    @Body() body: User,
    @Res({ passthrough: true }) response: Response,
  ) {
    let user = await this.authService.login(body);
    let token = await this.authService.generateToken(
      user.id,
      user.email,
      user.type,
    );
    response.cookie('accessToken', token);
    return {
      message: 'login Successful',
    };
  }
}
