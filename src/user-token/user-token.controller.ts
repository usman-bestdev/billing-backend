import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { Request } from 'express';
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
  async getUserToken(@Req() request: Request) {
    const { id } = await this.auth.verifyUserToken(
      request.cookies?.accessToken,
    );
    return this.tokenService.getInvokedToken(id);
  }

  @Post()
  async userToken(@Req() request: Request, @Body() body: UserToken) {
    const { id } = await this.auth.verifyUserToken(
      request.cookies?.accessToken,
    );
    return this.tokenService.invokeToken(body, id);
  }

  @Post('add')
  async addToken(@Req() request: Request, @Body() body: { token: number }) {
    const { id } = await this.auth.verifyUserToken(
      request.cookies?.accessToken,
    );

    return this.tokenService.addToken(id, body.token);
  }
}
