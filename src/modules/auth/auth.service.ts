import { Injectable } from '@nestjs/common';
import { IUserService } from '../user/user.interface';
import { IAuthService } from './auth.interface';
import { LoginUserDto } from './dtos/login-user.dto';

@Injectable()
export class AuthService implements IAuthService {
  constructor(private userService: IUserService) {}

  async validateUser(email: string, password: string): Promise<any> {
    const candidate = await this.userService.getUserByEmail(email);
    if (candidate && candidate.password === password) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = candidate;
      console.log(result);
      return result;
    }
    return null;
  }
}
