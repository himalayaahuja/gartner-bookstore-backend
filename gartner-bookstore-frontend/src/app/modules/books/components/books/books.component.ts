import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/books';
import { loadBooks } from '../../store/books/actions/book.actions';
import { Filters } from '../../store/books/models/filters.model';
import { Subscription, debounceTime, distinctUntilChanged, filter, fromEvent, map } from 'rxjs';
import { getAllBooks, getFilters, getPagingMeta } from '../../store/books/selectors/book.selectors';
import { Book } from '../../store/books/models/book.model';
import { PagingMeta } from '../../store/books/models/paging-meta.model';
import { LabelType, Options, ChangeContext, PointerType } from 'ngx-slider-v2';

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
  bookSearchFilterSubscription!: Subscription;

  priceFilterOptions: Options = {
    floor: 0,
    ceil: 100,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return '<b>Min price:</b> $' + value;
        case LabelType.High:
          return '<b>Max price:</b> $' + value;
        default:
          return '$' + value;
      }
    },
  };

  priceFilterMinValue = 0;
  priceFilterMaxValue = 100;

  @ViewChild('bookSearchInput', { static: true }) projectSearchInput: ElementRef | undefined;

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

    if (this.bookSearchFilterSubscription) {
      this.bookSearchFilterSubscription.unsubscribe();
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
      if (filters) {
        const newPriceFilterOptions: Options = Object.assign({}, this.priceFilterOptions);
        newPriceFilterOptions.floor = Math.floor(filters.minPriceAnchor as number);
        newPriceFilterOptions.ceil = Math.ceil(filters.maxPriceAnchor as number);
        this.priceFilterOptions = newPriceFilterOptions;

        this.priceFilterMinValue = Math.floor(filters.priceRangeFrom as number);
        this.priceFilterMaxValue = Math.ceil(filters.priceRangeTo as number);
      }
    });

    // binding project filter
    this.bookSearchFilterSubscription = this.bindBookSearchFilter();

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

  bindBookSearchFilter(): Subscription {
    return fromEvent(this.projectSearchInput?.nativeElement, 'keyup')
      .pipe(
        // get value
        map((event: any) => {
          return event.target.value;
        }),
        // if character length greater then x
        filter((res) => {
          // if (!res.length) {
          // }
          // return res.length;
          return true;
        }),

        // Time in milliseconds between key events
        debounceTime(500),

        // If previous query is diffent from current
        distinctUntilChanged(),

        // subscription for response
      )
      .subscribe((bookSearchInput: string) => {
        // console.log(bookSearchInput);
        this.searchBooksBy(bookSearchInput);
      });
  }
  searchBooksBy(searchBy: string): void {
    // tslint:disable-next-line: no-non-null-assertion
    const newFilters: Filters = {
      searchQuery: searchBy,
      priceRangeFrom: this.filters?.priceRangeFrom,
      priceRangeTo: this.filters?.priceRangeTo,
      ratingMin: this.filters?.ratingMin,
      minPriceAnchor: this.filters?.minPriceAnchor,
      maxPriceAnchor: this.filters?.maxPriceAnchor,
    };
    // dispatch
    this.store.dispatch(loadBooks({ page: 1, filters: newFilters }));
  }

  public getAuthors(authors: string[]): string {
    return authors.join(', ');
  }

  onRatingFilterChange(ratingFilterVal: number): void {
    this.store.dispatch(loadBooks({ page: 1, filters: { ...this.filters, ratingMin: ratingFilterVal } as Filters }));
  }

  priceFilterChanged(changeContext: ChangeContext) {
    // console.log(
    //   `{pointerType: ${changeContext.pointerType === PointerType.Min ? 'Min' : 'Max'}, ` +
    //   `value: ${changeContext.value}, ` +
    //   `highValue: ${changeContext.highValue}}`,
    // );

    const newFilters: Filters = {
      searchQuery: this.filters?.searchQuery,
      priceRangeFrom: changeContext.value,
      priceRangeTo: changeContext.highValue,
      ratingMin: this.filters?.ratingMin,
      minPriceAnchor: this.filters?.minPriceAnchor,
      maxPriceAnchor: this.filters?.maxPriceAnchor,
    };
    // dispatch
    this.store.dispatch(loadBooks({ page: 1, filters: newFilters }));
  }
}
