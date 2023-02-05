import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { CreateUserDto } from 'src/modules/user/dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { IUserService } from './user.interface';

@Injectable()
export class UserService implements IUserService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(data: CreateUserDto): Promise<User> {
    return await this.prisma.user.create({ data });
  }
  async getUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async getUserById(id: number): Promise<User> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async getUserByEmail(email: string): Promise<any> {
    const user = await this.prisma.user.findMany({
      where: { email },
    });
    console.log(user);
    return user;
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
}
