import { Injectable } from '@nestjs/common';
import { CreateBookDto } from '../dto/create-book.dto';
import { UpdateBookDto } from '../dto/update-book.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from '../schemas/book.schema';
import { GetBooksQuery } from '../dto/list-filtered-books.dto';
import { BOOK_PAGE_SIZE } from '../constants/index.constant';

@Injectable()
export class BooksService {
  constructor(@InjectModel(Book.name) private bookModel: Model<Book>) { }

  async findAll(filterQueryParams: GetBooksQuery): Promise<Book[]> {
    const searchFilter = filterQueryParams.query ? { $text: { $search: `${filterQueryParams.query}` } } : {};
    const priceFilter = { $and: [{ price: { $gte: filterQueryParams.priceRangeFrom } }, { price: { $lt: filterQueryParams.priceRangeTo } }] };
    return this.bookModel
      .aggregate([
        { $match: { $and: [searchFilter, priceFilter] } },
        {
          $project: {
            title: 1,
            isbn: 1,
            authors: 1,
            genre: 1,
            publisher: 1,
            publicationDate: 1,
            rating: { $round: [{ $avg: '$reviews.rating' }, 1] },
            price: 1,
            stock: 1,
          },
        },
        filterQueryParams.ratingMin === 0
          ? { $match: { $or: [{ rating: { $gte: filterQueryParams.ratingMin } }, { rating: null }] } }
          : { $match: { rating: { $gte: filterQueryParams.ratingMin } } },
      ])
      .skip((filterQueryParams.page - 1) * BOOK_PAGE_SIZE)
      .limit(BOOK_PAGE_SIZE)
      .exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} book`;
  }
}
