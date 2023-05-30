export interface Filters {
  readonly searchQuery: string | undefined;
  readonly priceRangeFrom: number | undefined;
  readonly priceRangeTo: number | undefined;
  readonly ratingMin: string | number | undefined;
}
