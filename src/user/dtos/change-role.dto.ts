import { Role } from '@prisma/client';

export class ChangeRoleDto {
  role: Role;
  userId: number;
}
