export interface Book {
  readonly _id: string;
  readonly title: string;
  readonly authors: string[];
  readonly genre: string[];
  readonly publisher: string;
  readonly publicationDate: string;
  readonly isbn: string;
  readonly price: number;
  readonly stock: number;
  readonly rating: number | null;

}
