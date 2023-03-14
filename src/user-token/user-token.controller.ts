import { Body, Controller, Post, Req } from '@nestjs/common';
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

  @Post()
  async userToken(@Req() request: Request, @Body() body: UserToken) {
    const { userId } = await this.auth.verifyUserToken(
      request.cookies?.accessToken,
    );

    return this.tokenService.invokeToken(body, userId);
  }
}
