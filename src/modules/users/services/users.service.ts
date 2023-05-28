import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/user.schema';
import { Model } from 'mongoose';
import { UserSeedInput } from '../dto/user-seed.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) { }

  async createSeed(userSeedDto: UserSeedInput): Promise<User> {
    const { email } = userSeedDto;
    const filter = { email };
    const update = {
      ...userSeedDto,
    };
    const upsertMasterBank = await this.userModel.findOneAndUpdate(filter, update, { new: true, upsert: true, runValidators: true }).exec();
    return upsertMasterBank;
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.userModel.findOne({ email }).lean().exec();
  }

  async findUserById(_id: string): Promise<User | undefined> {
    return this.userModel.findOne({ _id }).lean().exec();
  }
}
