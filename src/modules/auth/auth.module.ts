import { forwardRef, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from 'prisma/prisma.module';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
@Module({
  providers: [AuthService, UserService, LocalStrategy],
  controllers: [AuthController],
  imports: [PrismaModule, PassportModule, forwardRef(() => UserModule)],
  exports: [AuthService],
})
export class AuthModule {}
