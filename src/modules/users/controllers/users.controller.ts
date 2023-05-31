import { Controller, UseGuards, Post, Get, HttpCode, Body } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { LocalAuthGuard } from '../../auth/guards/local-auth.guard';
import { User, UserDocument } from '../schemas/user.schema';
import { AuthService } from '../../auth/services/auth.service';
import { UserAuthDto } from '../dto/user-auth.dto';
import { CurrentUser } from '../../../decorators/user.decorator';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { AddToCartDto } from '../dto/add-to-cart.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService, private readonly authService: AuthService) { }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(200)
  async login(@CurrentUser() user: UserDocument): Promise<UserAuthDto> {
    const auth = await this.authService.login(user);
    const populatedUser = await this.usersService.findPopulatedUserById(user._id);
    return { user: populatedUser, auth };
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getProfile(@CurrentUser() user: UserDocument): Promise<any> {
    return this.usersService.findPopulatedUserById(user._id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('add-to-cart')
  async addToCart(@CurrentUser() user: UserDocument, @Body() addToCartDto: AddToCartDto): Promise<any> {
    return this.usersService.addToCart(user._id, addToCartDto.bookId);
  }
}
