import { Body, Controller, Post, Put, Req, Res, Get } from '@nestjs/common';
import { RouteService } from './route.service';
import { Route, UpdateRoute } from 'src/validator/route.validator';
import { AuthService } from 'src/auth/auth.service';
import { Request, Response } from 'express';

@Controller('route')
export class RouteController {
  constructor(private routeService: RouteService, private auth: AuthService) {}
  @Get('admin')
  async getAdminRoutes(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    await this.auth.verifyAdminToken(request.cookies?.accessToken, response);
    return await this.routeService.getAdminRoute();
  }
  @Get()
  async getRoutes(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { id } = await this.auth.verifyUserToken(
      request.cookies?.accessToken,
      response,
    );
    return await this.routeService.getRoute(id);
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
  @Put('admin')
  async updateRouter(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    await this.auth.verifyAdminToken(request.cookies?.accessToken, response);
    return await this.routeService.updateRoute(request.body);
  }
}
