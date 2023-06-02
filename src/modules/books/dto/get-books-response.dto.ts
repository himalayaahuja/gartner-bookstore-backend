import { PagingMeta } from 'src/dto/index.dto';
import { Book } from '../schemas/book.schema';

export interface GetBooksFilters {
    readonly searchQuery: string;
    readonly ratingMin: number;
    readonly priceRangeFrom: number;
    readonly priceRangeTo: number;
    readonly minPriceAnchor: number;
    readonly maxPriceAnchor: number;
}

export interface GetBooksResponseDto {
    readonly items: Book[];
    readonly meta: PagingMeta;
    readonly filters: GetBooksFilters;
}
