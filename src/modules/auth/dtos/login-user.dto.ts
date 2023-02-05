import { IsEmail, IsString, Length } from 'class-validator';

export class LoginUserDto {
  @IsString({ message: 'this is not string' })
  @IsEmail({}, { message: 'this is not email' })
  readonly email: string;

  @Length(4, 16, { message: 'not valid password' })
  @IsString({ message: 'this is not string' })
  readonly password: string;
}
