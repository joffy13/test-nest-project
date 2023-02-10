import { Role } from '@prisma/client';

export interface LoginResult {
  email: string;
  id: number;
  role: Role;
  age: number;
}
