import {
  Controller,
  Body,
  Get,
  Param,
  Delete,
  Put,
  Post,
  ParseIntPipe,
  Inject,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserService } from './user.service';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(@Body() dto: CreateUserDto): Promise<User> {
    return this.userService.createUser(dto);
  }

  @Get()
  getAllUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.userService.getUserById(id);
  }

  @Put(':id')
  updateUser(
    @Body() dto: UpdateUserDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<User> {
    return this.userService.updateUser(dto, id);
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.userService.deleteUser(id);
  }
}
