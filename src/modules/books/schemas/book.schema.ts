import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from '../../users/schemas/user.schema';

export type BookDocument = HydratedDocument<Book>;

@Schema({ _id: false })
export class Review {
  @Prop({ required: true })
  rating: number;

  @Prop({
    default: function () {
      if (!this.message) {
        return '';
      }
    },
  })
  message: string;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
}
export const ReviewSchema = SchemaFactory.createForClass(Review);

@Schema()
export class Book {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true, unique: true })
  isbn: string;

  @Prop({ required: true })
  coverImage: string;

  @Prop({ required: true, type: [String] })
  authors: string[];

  @Prop({ required: true, type: [String] })
  genre: string[];

  @Prop({ required: true })
  publisher: string;

  @Prop({ type: Date, required: true })
  publicationDate: Date;

  @Prop({ required: true, min: 0, index: 1 })
  price: number;

  @Prop({ required: true, min: 0 })
  stock: number;

  @Prop({ type: [ReviewSchema], default: [] })
  reviews: Review[];
}

export const BookSchema = SchemaFactory.createForClass(Book);

BookSchema.index({ title: 'text', authors: 'text' });
