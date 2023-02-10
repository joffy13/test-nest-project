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

  async validate(email: string, password: string): Promise<any> {
    console.log(email);
    const candidate = await this.authService.validateUser(email, password);
    if (!candidate) {
      throw new UnauthorizedException();
    }
    return candidate;
  }
  async register(email: string, password: string, age: number): Promise<any> {
    console.log(email);
    const candidate = await this.authService.register({ email, password, age });
    if (!candidate) {
      throw new UnauthorizedException();
    }
    return candidate;
  }
}
