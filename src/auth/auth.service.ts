import { PrismaService } from './../prisma/prisma.service';
import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from 'src/validator/user.validator';
import { JwtService } from '@nestjs/jwt';

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
      // return await this.generateToken(user.id, user.email, user.type);
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }
  async generateToken(id: number, email: string, type: string) {
    const payload = { id, email, type };
    return await this.jwtService.signAsync(payload);
  }

  async verifyUserToken(token: string) {
    try {
      let value = await this.jwtService.verifyAsync(token);
      if (value.type == 'user') return value;
      else throw new UnauthorizedException('unAuthorise');
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }

  async verifyAdminToken(token: string) {
    try {
      let value = await this.jwtService.verifyAsync(token);
      if (value.type == 'admin') return value;
      else throw new UnauthorizedException('unAuthorise');
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}
