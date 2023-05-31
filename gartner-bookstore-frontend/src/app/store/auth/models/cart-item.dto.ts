import { Book } from 'src/app/modules/books/store/books/models/book.model';

export interface CartItem {
  readonly book: Book;

  readonly quantity: number;
}
