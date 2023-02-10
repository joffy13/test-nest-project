import { User } from '@prisma/client';
import { LoginUserDto } from './dtos/login-user.dto';

export interface IAuthService {
  validateUser(email: string, password: string): Promise<any>;
  login(user: User): Promise<any>;
}

export const iAuthToken = Symbol('IAuthService');
