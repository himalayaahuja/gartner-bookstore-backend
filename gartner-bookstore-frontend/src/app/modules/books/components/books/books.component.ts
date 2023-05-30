import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/books';
import { loadBooks } from '../../store/books/actions/book.actions';
import { Filters } from '../../store/books/models/filters.model';
import { Subscription } from 'rxjs';
import { getAllBooks, getFilters, getPagingMeta } from '../../store/books/selectors/book.selectors';
import { Book } from '../../store/books/models/book.model';
import { PagingMeta } from '../../store/books/models/paging-meta.model';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent implements OnInit, OnDestroy {
  filters: Filters | undefined;
  booksSubscription!: Subscription;
  books!: Book[];
  pagingMetaSubscription!: Subscription;
  pagingMeta!: PagingMeta | null;
  arrPages: Array<number> = [];
  filtersSubscription!: Subscription;

  constructor(private store: Store<AppState>) { }
  ngOnDestroy(): void {
    if (this.booksSubscription) {
      this.booksSubscription.unsubscribe();
    }
    if (this.pagingMetaSubscription) {
      this.pagingMetaSubscription.unsubscribe();
    }
    if (this.filtersSubscription) {
      this.filtersSubscription.unsubscribe();
    }
  }
  ngOnInit(): void {
    this.booksSubscription = this.store.select(getAllBooks).subscribe((books) => {
      this.books = books;
    });

    this.pagingMetaSubscription = this.store.select(getPagingMeta).subscribe((pagingMeta) => {
      this.pagingMeta = pagingMeta;
      if (pagingMeta) {
        this.arrPages = [];
        for (let index = 0; index < pagingMeta?.totalPages; index++) {
          this.arrPages.push(index + 1);
        }
      }
    });

    this.filtersSubscription = this.store.select(getFilters).subscribe((filters) => {
      this.filters = filters;
    });

    this.store.dispatch(loadBooks({ page: 1, filters: this.filters }));
  }

  loadNextPage(): void {
    this.store.dispatch(loadBooks({ page: this.pagingMeta?.currentPage ? this.pagingMeta?.currentPage + 1 : 1, filters: this.filters }));
  }

  loadPreviousPage(): void {
    this.store.dispatch(
      loadBooks({
        page: this.pagingMeta?.currentPage && this.pagingMeta?.currentPage !== 1 ? this.pagingMeta?.currentPage - 1 : 1,
        filters: this.filters,
      }),
    );
  }

  loadPage(page: number): void {
    this.store.dispatch(loadBooks({ page, filters: this.filters }));
  }
}
