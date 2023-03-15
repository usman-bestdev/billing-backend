import { PrismaService } from './../prisma/prisma.service';
import {
  ForbiddenException,
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from 'src/validator/user.validator';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async login(body: User) {
    const { email, password, type } = body;
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email_password_type: {
            email,
            password,
            type,
          },
        },
        select: {
          id: true,
          email: true,
          type: true,
        },
      });
      if (user) return user;
      else throw new UnauthorizedException('invalid credentials');
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }
  async generateToken(id: number, email: string, type: string) {
    const payload = { id, email, type };
    return await this.jwtService.signAsync(payload);
  }

  async verifyUserToken(token: string, response: Response) {
    try {
      let value = await this.jwtService.verifyAsync(token);
      if (value.type == 'user') return value;
      else {
        this.logout(response);
        throw new HttpException('unAuthorise', 444);
      }
    } catch (error) {
      this.logout(response);
      throw new HttpException(error.message, 444);
    }
  }

  async verifyAdminToken(token: string, response: Response) {
    try {
      let value = await this.jwtService.verifyAsync(token);
      if (value.type == 'admin') return value;
      else {
        this.logout(response);
        throw new HttpException('Invalid Token', 444);
      }
    } catch (error) {
      throw new HttpException(error.message, 444);
    }
  }

  logout(response: Response) {
    response.clearCookie('accessToken');
  }
}
