import { forwardRef, Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { IUserService, iUserToken } from './user.interface';
import { AuthModule } from '../auth/auth.module';

export const userProvider = {
  provide: iUserToken,
  useClass: UserService,
};

@Module({
  providers: [userProvider],
  controllers: [UserController],
  imports: [PrismaModule, forwardRef(() => AuthModule)],
  exports: [userProvider],
})
export class UserModule {}
