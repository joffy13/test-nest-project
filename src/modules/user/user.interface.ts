import { User } from '@prisma/client';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

export abstract class IUserService {
  abstract createUser(data: CreateUserDto): Promise<User>;

  abstract getUsers(): Promise<User[]>;

  abstract getUserById(id: number): Promise<User>;

  abstract getUserByEmail(email: string): Promise<User>;

  abstract updateUser(data: UpdateUserDto, id: number): Promise<User>;

  abstract deleteUser(id: number): Promise<User>;
}
