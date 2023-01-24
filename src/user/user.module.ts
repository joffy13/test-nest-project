import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { UserService } from './user.service';
import { UsersController } from './users.controller';

@Module({
  providers: [UserService],
  controllers: [UsersController],
  imports: [PrismaModule],
  exports: [UserService],
})
export class UserModule {}
