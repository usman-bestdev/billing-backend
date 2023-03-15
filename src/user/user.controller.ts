import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/validator/user.validator';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}
  @Get('')
  async user(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    let user = await this.authService.verifyUserToken(
      request.cookies?.accessToken,
      response,
    );
    return this.userService.user(user.id);
  }
}
