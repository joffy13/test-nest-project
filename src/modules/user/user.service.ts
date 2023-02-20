import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { CreateUserDto } from 'src/modules/user/dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(data: CreateUserDto): Promise<User> {
    const candidate = await this.getUserByEmail(data.email);
    if (candidate) {
      throw new HttpException('this email is exist', HttpStatus.BAD_GATEWAY);
    }
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(data.password, salt);
    return await this.prisma.user.create({
      data: { ...data, password: hashedPassword },
    });
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
    const user = await this.prisma.user.findFirst({
      where: { email },
    });
    return user;
  }

  async updateUser(data: UpdateUserDto, id: number): Promise<User> {
    console.log(data, id);
    return this.prisma.user.update({
      data,
      where: { id },
    });
  }
  async deleteUser(id: number): Promise<User> {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
