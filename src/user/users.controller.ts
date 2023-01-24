import {
  Controller,
  Body,
  Get,
  Param,
  Delete,
  Put,
  Post,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(@Body() dto: CreateUserDto) {
    return this.userService.createUser(dto);
  }

  @Get()
  getAllUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @Get(':id')
  getUserById(@Param('id') id: string): Promise<User> {
    return this.userService.getUserById(parseInt(id));
  }

  @Put(':id')
  updateUser(
    @Body() dto: UpdateUserDto,
    @Param('id') id: string,
  ): Promise<User> {
    return this.userService.updateUser(dto, parseInt(id));
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string): Promise<User> {
    return this.userService.deleteUser(parseInt(id));
  }
}
