// tslint:disable: max-line-length
import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';

import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, concatMap } from 'rxjs/operators';
import { BookService } from '../services/book.service';
import { bookActionTypes } from '../actions/book.actions';
import { BookListing } from '../models/books-listing.model';
import { AppState } from '..';

@Injectable()
export class BookEffects {
  constructor(private actions$: Actions, private bookService: BookService, private store: Store<AppState>) { }

  loadBooks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(bookActionTypes.loadBooks),
      concatMap((loadBooksAction) => this.bookService.fetchBooks(loadBooksAction.page, loadBooksAction.filters)),
      map((bookListing: BookListing) => bookActionTypes.loadBooksSuccess({ bookListing })),
      catchError((err) => of(bookActionTypes.loadBooksFailure(err))),
    ),
  );
}
