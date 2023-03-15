import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { UserToken } from 'src/validator/userToken.validator';
import { UserTokenService } from './user-token.service';

@Controller('user-token')
export class UserTokenController {
  constructor(
    private tokenService: UserTokenService,
    private auth: AuthService,
  ) {}

  @Get()
  async getUserToken(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { id } = await this.auth.verifyUserToken(
      request.cookies?.accessToken,
      response,
    );
    return this.tokenService.getInvokedToken(id);
  }

  @Post()
  async userToken(
    @Req() request: Request,
    @Body() body: UserToken,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { id } = await this.auth.verifyUserToken(
      request.cookies?.accessToken,
      response,
    );
    return this.tokenService.invokeToken(body, id);
  }

  @Post('add')
  async addToken(
    @Req() request: Request,
    @Body() body: { token: number },
    @Res({ passthrough: true }) response: Response,
  ) {
    const { id } = await this.auth.verifyUserToken(
      request.cookies?.accessToken,
      response,
    );

    return this.tokenService.addToken(id, body.token);
  }
}
