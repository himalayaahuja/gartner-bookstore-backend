import { IsNotEmpty, IsString } from 'class-validator';

export class AddToCartDto {
  @IsNotEmpty()
  @IsString()
  bookId: string;
}
