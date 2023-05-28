import { Controller, UseGuards, Post, Get, HttpCode } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { LocalAuthGuard } from '../../auth/guards/local-auth.guard';
import { User } from '../schemas/user.schema';
import { AuthService } from '../../auth/services/auth.service';
import { UserAuthDto } from '../dto/user-auth.dto';
import { CurrentUser } from '../../../decorators/user.decorator';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService, private readonly authService: AuthService) { }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(200)
  async login(@CurrentUser() user: User): Promise<UserAuthDto> {
    // console.log(user);
    const auth = await this.authService.login(user);
    return { user, auth };
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getProfile(@CurrentUser() user: User): Promise<any> {
    const { password, ...result } = user;
    return result;
  }
}
