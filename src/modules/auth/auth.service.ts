import { Inject, Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { CreateUserDto } from '../user/dtos/create-user.dto';
import { UserService } from '../user/user.service';
import { LoginUserDto } from './dtos/login-user.dto';
import { AuthResult } from './results/auth.result';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const candidate = await this.userService.getUserByEmail(email);
    const compare = await bcrypt.compare(password, candidate.password);
    if (compare) {
      const { password, ...result } = candidate;
      return result;
    }
    return null;
  }

  async register(dto: CreateUserDto): Promise<AuthResult> {
    let status: AuthResult = {
      success: true,
      message: 'user registered',
    };
    try {
      await this.userService.createUser(dto);
    } catch (err) {
      status = {
        success: false,
        message: err.message,
      };
    }
    return status;
  }

  async login(user: User) {
    const payload = { email: user.email, id: user.id, role: user.role };
    return {
      ...user,
      access_token: this.jwtService.sign(payload),
    };
  }
}
