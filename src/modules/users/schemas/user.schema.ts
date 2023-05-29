import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { Book } from 'src/modules/books/schemas/book.schema';

export type UserDocument = HydratedDocument<User>;

@Schema({ _id: false })
export class CartItem {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Book' })
  book: Book;

  @Prop({ required: true, min: 1 })
  quantity: number;
}
export const CartItemSchema = SchemaFactory.createForClass(CartItem);

@Schema()
export class User {
  @Prop({ required: true })
  firstName: string;

  @Prop({
    defaultValue: function () {
      if (!this.lastName) {
        return '';
      }
    },
  })
  lastName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: [CartItemSchema], default: [] })
  cart: CartItem[];
}

export const UserSchema = SchemaFactory.createForClass(User);
