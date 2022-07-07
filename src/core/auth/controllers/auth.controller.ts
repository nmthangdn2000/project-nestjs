import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserDto } from '../dtos/user.dto';
import { User } from '../schemas/user.schema';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Get()
  async findAll(): Promise<User[]> {
    return this.authService.findAll();
  }

  @Post('sign-in')
  async signIn(@Body() data: UserDto) {
    return this.authService.signIn(data);
  }

  @Post('sign-up')
  async signUp(@Body() data: UserDto) {
    return this.authService.signUp(data);
  }
}
