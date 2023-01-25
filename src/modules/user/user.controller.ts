import {
  Controller,
  Body,
  Get,
  Param,
  Delete,
  Put,
  Post,
  ParseIntPipe,
} from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators';
import { User } from '@prisma/client';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserService } from './user.service';
import { Roles } from 'src/common/decorators/roles.decorator';
import { ChangeRoleDto } from './dtos/change-role.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(@Body() dto: CreateUserDto) {
    return this.userService.createUser(dto);
  }

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
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

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('/role')
  changeRole(@Body() dto: ChangeRoleDto): Promise<User> {
    return this.userService.changeRole(dto);
  }
}
