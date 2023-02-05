import { forwardRef, Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { IUserService } from './user.interface';
import { AuthModule } from '../auth/auth.module';

const userProvider = {
  provide: IUserService,
  useClass: UserService,
};

@Module({
  providers: [userProvider],
  controllers: [UserController],
  imports: [PrismaModule, forwardRef(() => AuthModule)],
  exports: [IUserService],
})
export class UserModule {}
