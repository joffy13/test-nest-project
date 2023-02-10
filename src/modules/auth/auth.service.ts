import { Inject, Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { CreateUserDto } from '../user/dtos/create-user.dto';
import { IUserService, iUserToken } from '../user/user.interface';
import { IAuthService } from './auth.interface';
import { LoginUserDto } from './dtos/login-user.dto';
import { AuthResult } from './results/auth.result';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(iUserToken) private userService: IUserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const candidate = await this.userService.getUserByEmail(email);
    if (candidate && candidate.password === password) {
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
      console.log(dto);
      await this.userService.createUser(dto);
    } catch (err) {
      status = {
        success: false,
        message: err,
      };
    }
    return status;
  }

  async login(user: User) {
    console.log(user);
    const payload = { email: user.email, id: user.id, role: user.role };
    return {
      ...user,
      access_token: this.jwtService.sign(payload),
    };
  }
}
