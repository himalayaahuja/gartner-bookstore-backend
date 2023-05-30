import { BadRequestException } from '@nestjs/common';
import { Transform, Type } from 'class-transformer';
import { IsEnum, IsInt, IsString, IsOptional, Min } from 'class-validator';

export class GetBooksQuery {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  page = 1;

  @IsOptional()
  @IsString()
  searchQuery = '';

  @IsOptional()
  @Min(0)
  @Type(() => Number)
  priceRangeFrom: number;

  @IsOptional()
  @Min(0)
  @Type(() => Number)
  priceRangeTo: number;

  @IsOptional()
  @Min(0)
  @Type(() => Number)
  // @TransformRating()
  public ratingMin = 0;
}

// function TransformRating() {
//   return Transform((ratingMin) => {
//     switch (ratingMin.value) {
//       case '0 and above':
//         return 0;
//       case '1 and above':
//         return 1;
//       case '2 and above':
//         return 2;
//       case '3 and above':
//         return 3;
//       case '4 and above':
//         return 4;
//       default:
//         throw new BadRequestException(
//           "ratingMin must be a defined enum like : '0 and above', '1 and above', '2 and above', '3 and above', '4 and above'",
//         );
//     }
//   });
// }
