import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserToken } from 'src/validator/userToken.validator';

@Injectable()
export class UserTokenService {
  constructor(private prisma: PrismaService) {}

  async getInvokedToken(userId: number) {
    return await this.prisma.userToken.findMany({
      include: { route: true },
      where: { userId },
    });
  }
  async invokeToken(body: UserToken, userId: number) {
    const { routeId } = body;
    let record = null;
    try {
      let route = await this.prisma.route.findUnique({
        where: { id: routeId },
        select: { cost: true },
      });
      let user = await this.prisma.user.findUnique({
        where: { id: userId },
        select: { token: true },
      });

      if (user.token >= route.cost) {
        await this.prisma.user.update({
          where: {
            id: userId,
          },
          data: { token: user.token - route.cost },
        });
        const userToken = await this.prisma.userToken.findUnique({
          where: { routeId_userId: { userId, routeId } },
          select: { invoke: true },
        });
        if (userToken) {
          record = await this.prisma.userToken.update({
            where: { routeId_userId: { userId, routeId } },
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
      } else {
        throw new ForbiddenException('Please add token first');
      }

      return record;
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }

  async addToken(id: number, token: number) {
    try {
      let user = await this.prisma.user.findUnique({
        where: { id },
        select: { token: true },
      });
      return await this.prisma.user.update({
        where: {
          id,
        },
        data: { token: user.token + token },
      });
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }
}
