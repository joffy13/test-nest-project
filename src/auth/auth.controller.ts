import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dtos/create-user.dto';
import { User } from '@prisma/client';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  login(@Body() dto: CreateUserDto): Promise<User> {
    return this.authService.login(dto);
  }

  @Post('/register')
  register(@Body() dto: CreateUserDto) {
    return this.authService.register(dto);
  }
}
