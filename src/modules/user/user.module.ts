import { forwardRef, Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { IUserService } from './user.interface';
import { AuthModule } from '../auth/auth.module';

@Module({
  providers: [
    {
      provide: IUserService,
      useClass: UserService,
    },
  ],
  controllers: [UserController],
  imports: [PrismaModule, forwardRef(() => AuthModule)],
  exports: [IUserService],
})
export class UserModule {}
