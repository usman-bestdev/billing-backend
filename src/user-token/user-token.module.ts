import { Module } from '@nestjs/common';
import { UserTokenService } from './user-token.service';
import { UserTokenController } from './user-token.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  providers: [UserTokenService],
  controllers: [UserTokenController],
})
export class UserTokenModule {}
