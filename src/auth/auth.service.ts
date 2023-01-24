import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import {
  HttpException,
  UnauthorizedException,
} from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt/dist';
import { PrismaService } from 'prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from '../user/dtos/create-user.dto';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from 'src/user/dtos/login-user.dto';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(dto: LoginUserDto): Promise<any> {
    const candidate = await this.validUser(dto);
    return this.generateToken(candidate);
  }

  async register(dto: CreateUserDto): Promise<string> {
    const candidate = await this.userService.getUserByEmail(dto.email);
    if (candidate) {
      throw new HttpException('this user is exist', HttpStatus.BAD_REQUEST);
    }
    const hashPassword = await bcrypt.hash(dto.password, 3);
    const user = await this.userService.createUser({
      ...dto,
      password: hashPassword,
    });
    return this.generateToken(user);
  }

  private async generateToken(user: User) {
    const payload = { email: user.email, id: user.id, role: user.role };
    return this.jwtService.sign(payload);
  }
  private async validUser(dto: LoginUserDto) {
    const candidate = await this.userService.getUserByEmail(dto.email);
    const comparePassword = await bcrypt.compare(
      dto.password,
      candidate.password,
    );
    if (candidate && comparePassword) {
      return candidate;
    }
    throw new UnauthorizedException({ message: 'not valid email or password' });
  }
}
