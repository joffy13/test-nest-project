import { Role } from '@prisma/client';
import { IsEnum, IsNumber } from 'class-validator';

export class ChangeRoleDto {
  @IsEnum(Role, { message: 'not valid role' })
  role: Role;

  @IsNumber({}, { message: 'this is not number' })
  userId: number;
}
