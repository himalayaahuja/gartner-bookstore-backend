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

  async findAll(filterQueryParams: GetBooksQuery): Promise<any> {
    const searchFilter = filterQueryParams.searchQuery ? { $text: { $search: `${filterQueryParams.searchQuery}` } } : {};
    const priceFilter = { $and: [{ price: { $gte: filterQueryParams.priceRangeFrom } }, { price: { $lt: filterQueryParams.priceRangeTo } }] };
    const booksAggregateQuery = [
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
      { $group: { _id: null, maxPriceRange: { $max: '$price' }, totalItems: { $sum: 1 }, items: { $push: '$$ROOT' } } },
      { $unwind: '$items' },
      { $project: { _id: 0 } },
    ];

    const aggregateCursor = this.bookModel
      .aggregate(booksAggregateQuery)
      .skip((filterQueryParams.page - 1) * BOOK_PAGE_SIZE)
      .limit(BOOK_PAGE_SIZE)
      .cursor();

    const meta: any = {};
    const items = [];

    await aggregateCursor.eachAsync((doc, i) => {
      items.push(doc.items);
      meta.totalItems = doc.totalItems;
      meta.itemCount =
        doc.totalItems < BOOK_PAGE_SIZE
          ? doc.totalItems
          : doc.totalItems >= filterQueryParams.page * BOOK_PAGE_SIZE
            ? BOOK_PAGE_SIZE
            : doc.totalItems % BOOK_PAGE_SIZE;
      meta.itemsPerPage = BOOK_PAGE_SIZE;
      meta.totalPages = Math.ceil(doc.totalItems.totalItems / BOOK_PAGE_SIZE);
      meta.currentPage = filterQueryParams.page;
      filterQueryParams.priceRangeTo = doc.maxPriceRange;
    });

    return {
      items,
      meta,
      filters: filterQueryParams,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} book`;
  }
}
