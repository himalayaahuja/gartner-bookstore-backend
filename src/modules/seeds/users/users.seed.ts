/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Injectable } from '@nestjs/common';
import { Command } from 'nestjs-command';
import { UserSeedInput } from 'src/modules/users/dto/user-seed.dto';
import { UsersService } from 'src/modules/users/services/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersSeed {
  constructor(private userService: UsersService) {}

  // autoExit defaults to `true`, but you can use `autoExit: false` if you need more control
  @Command({ command: 'add-user:seed', describe: 'adding user seeds' })
  async create() {
    const user = {} as UserSeedInput;
    user.firstName = 'Himalaya';
    user.lastName = 'Ahuja';
    user.email = 'himalaya.ahuja@outlook.com';
    user.password = bcrypt.hashSync('admin@123', 10);

    await this.userService.createSeed(user);

    const user2 = {} as UserSeedInput;
    user2.firstName = 'Rich';
    user2.lastName = 'Wandell';
    user2.email = 'rich.wandell@gartner.com';
    user2.password = bcrypt.hashSync('admin@123', 10);

    await this.userService.createSeed(user2);
  }
}
