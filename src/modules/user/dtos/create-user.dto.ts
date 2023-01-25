import { IsNumber, IsString, Length, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'this is not string' })
  @IsEmail({}, { message: 'this is not email' })
  readonly email: string;

  @Length(4, 16, { message: 'not valid password' })
  @IsString({ message: 'this is not string' })
  readonly password: string;

  @IsNumber({}, { message: 'this is not number' })
  readonly age: number;
}
