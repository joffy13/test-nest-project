import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from 'src/modules/user/dtos/create-user.dto';
import { ChangeRoleDto } from './dtos/change-role.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(data: CreateUserDto): Promise<User> {
    const user = await this.prisma.user.create({ data });
    return user;
  }
  async getUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async getUserById(id: number): Promise<User> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async getUserByEmail(email: string): Promise<User> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async updateUser(data: UpdateUserDto, id: number): Promise<User> {
    return this.prisma.user.update({
      data: data,
      where: { id },
    });
  }
  async deleteUser(id: number): Promise<User> {
    return this.prisma.user.delete({
      where: { id },
    });
  }
  async changeRole(dto: ChangeRoleDto): Promise<User> {
    const user = await this.prisma.user.update({
      data: { role: dto.role },
      where: { id: dto.userId },
    });
    return user;
  }
}
