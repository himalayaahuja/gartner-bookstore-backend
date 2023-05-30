export interface PagingMeta {
  readonly totalItems: number;

  readonly itemCount: number;

  readonly itemsPerPage: number;

  readonly totalPages: number;

  readonly currentPage: number;
}
