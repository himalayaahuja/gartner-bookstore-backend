import { Injectable } from '@nestjs/common';
import { CreateBookDto } from '../dto/create-book.dto';
import { UpdateBookDto } from '../dto/update-book.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from '../schemas/book.schema';
import { GetBooksQuery } from '../dto/list-filtered-books.dto';
import { BOOK_PAGE_SIZE } from '../constants/index.constant';
import { GetBooksFilters, GetBooksResponseDto } from '../dto/get-books-response.dto';

@Injectable()
export class BooksService {
  constructor(@InjectModel(Book.name) private bookModel: Model<Book>) { }

  async findAll(filterQueryParams: GetBooksQuery): Promise<GetBooksResponseDto> {
    const minPriceAnchor = (await this.bookModel.find().sort({ price: 1 }).limit(1).exec())[0]?.price;
    const maxPriceAnchor = (await this.bookModel.find().sort({ price: -1 }).limit(1).exec())[0]?.price;

    const searchFilter = filterQueryParams.searchQuery ? { $text: { $search: `${filterQueryParams.searchQuery}` } } : {};
    const priceFilter = {
      $and: [
        { price: { $gte: filterQueryParams.priceRangeFrom ? filterQueryParams.priceRangeFrom : minPriceAnchor } },
        { price: { $lte: filterQueryParams.priceRangeTo ? filterQueryParams.priceRangeTo : maxPriceAnchor } },
      ],
    };
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
      {
        $group: {
          _id: null,
          // minPriceRange: { $min: '$price' },
          // maxPriceRange: { $max: '$price' },
          totalItems: { $sum: 1 },
          items: { $push: '$$ROOT' },
        },
      },
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
      meta.totalPages = Math.ceil(doc.totalItems / BOOK_PAGE_SIZE);
      meta.currentPage = filterQueryParams.page;
    });

    filterQueryParams.priceRangeFrom = filterQueryParams.priceRangeFrom ? filterQueryParams.priceRangeFrom : minPriceAnchor;
    filterQueryParams.priceRangeTo = filterQueryParams.priceRangeTo ? filterQueryParams.priceRangeTo : maxPriceAnchor;

    (filterQueryParams as any).minPriceAnchor = minPriceAnchor ? minPriceAnchor : 0;
    (filterQueryParams as any).maxPriceAnchor = maxPriceAnchor ? maxPriceAnchor : 0;
    filterQueryParams.priceRangeFrom = filterQueryParams.priceRangeFrom ? filterQueryParams.priceRangeFrom : 0;
    filterQueryParams.priceRangeTo = filterQueryParams.priceRangeTo ? filterQueryParams.priceRangeTo : 0;

    return {
      items,
      meta,
      filters: filterQueryParams as unknown as GetBooksFilters,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} book`;
  }
}
