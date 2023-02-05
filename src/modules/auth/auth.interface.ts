import { User } from '@prisma/client';
import { LoginUserDto } from './dtos/login-user.dto';

export abstract class IAuthService {
  abstract validateUser(user: LoginUserDto): Promise<any>;
}
