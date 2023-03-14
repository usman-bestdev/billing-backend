import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Route, UpdateRoute } from 'src/validator/route.validator';

@Injectable()
export class RouteService {
  constructor(private prisma: PrismaService) {}

  async getRoute() {
    try {
      const user = await this.prisma.route.findMany({
        select: {
          id: true,
          title: true,
          cost: true,
        },
      });

      return user;
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }

  async createRoute(body: Route) {
    const { title, cost } = body;
    try {
      const user = await this.prisma.route.create({
        data: {
          title: title,
          cost: cost,
        },
        select: {
          id: true,
          title: true,
          cost: true,
        },
      });

      return user;
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }
  async updateRoute(body: UpdateRoute) {
    const { title, cost, id } = body;
    try {
      const user = await this.prisma.route.update({
        where: {
          id,
        },
        data: {
          title,
          cost,
        },
      });

      return user;
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }
}
