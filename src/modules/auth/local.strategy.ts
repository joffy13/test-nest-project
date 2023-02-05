import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { IAuthService } from './auth.interface';
import { LoginUserDto } from './dtos/login-user.dto';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(user: LoginUserDto): Promise<any> {
    const candidate = await this.authService.validateUser(user);
    if (!candidate) {
      throw new UnauthorizedException();
    }
    return candidate;
  }
}
