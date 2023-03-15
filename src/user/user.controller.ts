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
    const { type } = request.query;
    let user = null;
    if (type == 'admin') {
      user = await this.authService.verifyAdminToken(
        request.cookies?.accessToken,
        response,
      );
    } else {
      user = await this.authService.verifyUserToken(
        request.cookies?.accessToken,
        response,
      );
    }
    return this.userService.user(user.id);
  }

  /**
   * Get_All_User(type='user)
   * @param request
   */
  @Get('admin')
  async admin(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const admin = await this.authService.verifyAdminToken(
      request.cookies?.accessToken,
      response,
    );
    return this.userService.admin();
  }
}
