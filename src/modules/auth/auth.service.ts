import { Injectable } from '@nestjs/common';
import { IUserService } from '../user/user.interface';
import { LoginUserDto } from './dtos/login-user.dto';

@Injectable()
export class AuthService {
  constructor(private userService: IUserService) {}

  async validateUser(user: LoginUserDto): Promise<any> {
    const candidate = await this.userService.getUserByEmail(user.email);
    if (candidate && candidate.password === user.password) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
