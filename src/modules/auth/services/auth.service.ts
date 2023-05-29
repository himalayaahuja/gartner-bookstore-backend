import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/modules/users/services/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if (user && bcrypt.compareSync(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const _email = user.email;
    const payload = { username: _email, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
