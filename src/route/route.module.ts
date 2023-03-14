import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { RouteController } from './route.controller';
import { RouteService } from './route.service';

@Module({
  imports: [AuthModule],
  providers: [RouteService],
  controllers: [RouteController],
})
export class RouteModule {}
