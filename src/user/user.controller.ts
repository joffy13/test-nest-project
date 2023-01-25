import {
  Controller,
  Body,
  Get,
  Param,
  Delete,
  Put,
  Post,
} from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators';
import { User } from '@prisma/client';
import { RolesGuard } from 'src/auth/roles.guar';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserService } from './user.service';
import { Roles } from 'src/auth/roles.decorator';
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

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('/role')
  changeRole(@Body() dto: ChangeRoleDto): Promise<User> {
    return this.userService.changeRole(dto);
  }
}
