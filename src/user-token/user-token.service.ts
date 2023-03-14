import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserToken } from 'src/validator/userToken.validator';

@Injectable()
export class UserTokenService {
  constructor(private prisma: PrismaService) {}

  async invokeToken(body: UserToken, userId: number) {
    const { routeId, id } = body;
    let record = null;
    try {
      const userToken = await this.prisma.userToken.findUnique({
        where: { userId, routeId },
        select: { invoke: true },
      });
      if (userToken) {
        record = await this.prisma.userToken.update({
          where: { userId, routeId },
          data: { invoke: userToken.invoke + 1 },
        });
      } else {
        record = await this.prisma.userToken.create({
          data: {
            userId,
            routeId,
            invoke: 1,
          },
        });
      }

      return record;
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }
}
