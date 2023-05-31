import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CartItem, User, UserDocument } from '../schemas/user.schema';
import { Model } from 'mongoose';
import * as mongoose from 'mongoose';
import { UserSeedInput } from '../dto/user-seed.dto';
import { BookDocument } from 'src/modules/books/schemas/book.schema';

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

  async findPopulatedUserById(_id: mongoose.Types.ObjectId): Promise<UserDocument> {
    const user = await this.userModel.findOne({ _id }, { password: 0 }).exec();
    return user.populate('cart.book');
  }

  async addToCart(userId: mongoose.Types.ObjectId, bookId: string): Promise<CartItem[]> {
    const cartItem = { book: bookId, quantity: 1 };
    const user = await this.userModel.findById(userId).exec();

    const foundItemIndex = user.cart.findIndex((item) => {
      return item.book.toString() === bookId;
    });

    if (foundItemIndex === -1) {
      user.cart.push(cartItem as unknown as CartItem);
    } else {
      user.cart[foundItemIndex].quantity += 1;
    }
    const populatedUser = await (await user.save()).populate('cart.book');
    return populatedUser.cart;
  }
}
