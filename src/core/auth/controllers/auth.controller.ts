import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { Auth } from '../decorators/Auth.decorator';
import { UserDto } from '../dtos/user.dto';
import { Role } from '../enums/role.enum';
import { User } from '../schemas/user.schema';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Auth(Role.ADMIN, Role.EMPLOYEE)
  @Get()
  async findAll(@Request() res): Promise<User[]> {
    console.log(res.user);

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
