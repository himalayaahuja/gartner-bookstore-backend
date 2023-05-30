import { createSelector, createFeatureSelector } from '@ngrx/store';
import { BookState, selectAll } from '../reducers/book.reducer';

export const bookFeatureSelector = createFeatureSelector<BookState>('books');

export const getAllBooks = createSelector(bookFeatureSelector, selectAll);

export const getPagingMeta = createSelector(bookFeatureSelector, (state) => state.pagingMeta);

export const getFilters = createSelector(bookFeatureSelector, (state) => state.filters);
