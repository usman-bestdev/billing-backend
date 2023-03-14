import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async user(id: number) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id,
        },
        select: {
          id: true,
          email: true,
          type: true,
          token: true,
        },
      });
      if (user) return user;
      else throw new UnauthorizedException('fail');
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }
}
