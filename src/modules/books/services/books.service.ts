import { Injectable } from '@nestjs/common';
import { CreateBookDto } from '../dto/create-book.dto';
import { UpdateBookDto } from '../dto/update-book.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from '../schemas/book.schema';
import { GetBooksQuery } from '../dto/list-filtered-books.dto';

@Injectable()
export class BooksService {
  constructor(@InjectModel(Book.name) private bookModel: Model<Book>) { }

  async findAll(filterQueryParams: GetBooksQuery): Promise<Book[]> {
    const ratingMax = 5;
    return this.bookModel.find({ $text: { $search: `${filterQueryParams.title} ${filterQueryParams.author}` } }).exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} book`;
  }
}
