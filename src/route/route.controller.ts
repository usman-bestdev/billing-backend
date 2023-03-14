import { Body, Controller, Post, Put, Req, Res, Get } from '@nestjs/common';
import { RouteService } from './route.service';
import { Route, UpdateRoute } from 'src/validator/route.validator';
import { AuthService } from 'src/auth/auth.service';
import { Request } from 'express';

@Controller('route')
export class RouteController {
  constructor(private routeService: RouteService, private auth: AuthService) {}
  @Get()
  async getRoutes(@Req() request: Request) {
    await this.auth.verifyUserToken(request.cookies?.accessToken);
    return this.routeService.getRoute();
  }

  @Post()
  async createRouter(@Req() request: Request, @Body() body: Route) {
    await this.auth.verifyAdminToken(request.cookies?.accessToken);

    return this.routeService.createRoute(body);
  }
  @Put()
  updateRouter(@Body() body: UpdateRoute) {
    return this.routeService.updateRoute(body);
  }
}
