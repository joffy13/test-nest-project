import { IsEmail, IsNumber, IsString, Length } from 'class-validator';

export class UpdateUserDto {
  readonly email?: string;
  readonly password?: string;
  readonly age?: number;
}
