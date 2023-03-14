import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { RouteController } from './route/route.controller';
import { RouteModule } from './route/route.module';
import { UserTokenModule } from './user-token/user-token.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    RouteModule,
    UserTokenModule,
    // JwtModule.register({
    //   secret: 'this is testing secret',
    //   signOptions: { expiresIn: '1d' },
    // }),
  ],
})
export class AppModule {}
