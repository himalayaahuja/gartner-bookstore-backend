import { Book } from './book.model';
import { Filters } from './filters.model';
import { PagingMeta } from './paging-meta.model';

export interface BookListing {
  readonly items: Book[];
  readonly meta: PagingMeta;
  readonly filters: Filters;
}
