import { createAction, props } from '@ngrx/store';
import { Filters } from '../models/filters.model';
import { BookListing } from '../models/books-listing.model';

export const loadBooks = createAction('[Book] Load Books', props<{ page: number | undefined; filters: Filters | undefined }>());

export const loadBooksSuccess = createAction('[Book] Load Books Success', props<{ bookListing: BookListing }>());

export const loadBooksFailure = createAction('[Book] Load Books Failure', props<{ error: any }>());

export const bookActionTypes = {
  loadBooks,
  loadBooksSuccess,
  loadBooksFailure,
};
