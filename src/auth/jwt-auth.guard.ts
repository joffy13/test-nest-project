import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    try {
      const header = request.headers.authorization;
      const bearer = header.split(' ')[0];
      const token = header.split(' ')[1];

      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException({ message: 'user not authorized' });
      }

      const user = this.jwtService.verify(token);

      request.user = user;

      return true;
    } catch (error) {
      throw new UnauthorizedException({ message: 'user not authorized' });
    }
  }
}
