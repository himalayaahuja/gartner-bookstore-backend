import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { PagingMeta } from '../models/paging-meta.model';
import { Book } from '../models/book.model';
import { Filters } from '../models/filters.model';
import { bookActionTypes } from '../actions/book.actions';

export interface BookState extends EntityState<Book> {
  pagingMeta: PagingMeta | null;
  filters: Filters | undefined;
  loading: boolean;
  error: any;
}

// export const adapter: EntityAdapter<Book> = createEntityAdapter<Book>();
export const adapter: EntityAdapter<Book> = createEntityAdapter<Book>({
  selectId: (e) => e._id,
});

const initialState: BookState = adapter.getInitialState({
  pagingMeta: null,
  filters: undefined,
  loading: false,
  error: null,
});

export const bookReducer = createReducer(
  initialState,

  on(bookActionTypes.loadBooks, (state, action) => {
    return { ...state, loading: true, error: null };
  }),

  on(bookActionTypes.loadBooksSuccess, (state, action) => {
    return adapter.setAll(action.bookListing.items, {
      ...state,
      loading: false,
      error: null,
      pagingMeta: action.bookListing.meta,
      filters: action.bookListing.filters,
    });
  }),

  on(bookActionTypes.loadBooksFailure, (state, action) => {
    return { ...state, loading: false, error: action.error };
  }),
);

export const { selectAll, selectIds } = adapter.getSelectors();
