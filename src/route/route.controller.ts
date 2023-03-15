import { Body, Controller, Post, Put, Req, Res, Get } from '@nestjs/common';
import { RouteService } from './route.service';
import { Route, UpdateRoute } from 'src/validator/route.validator';
import { AuthService } from 'src/auth/auth.service';
import { Request, Response } from 'express';

@Controller('route')
export class RouteController {
  constructor(private routeService: RouteService, private auth: AuthService) {}
  @Get()
  async getRoutes(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { id } = await this.auth.verifyUserToken(
      request.cookies?.accessToken,
      response,
    );
    return this.routeService.getRoute(id);
  }

  @Post()
  async createRouter(
    @Req() request: Request,
    @Body() body: Route,
    @Res({ passthrough: true }) response: Response,
  ) {
    await this.auth.verifyAdminToken(request.cookies?.accessToken, response);

    return this.routeService.createRoute(body);
  }
  @Put()
  updateRouter(@Body() body: UpdateRoute) {
    return this.routeService.updateRoute(body);
  }
}
