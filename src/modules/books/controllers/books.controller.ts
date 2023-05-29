/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { BooksService } from '../services/books.service';
import { GetBooksQuery } from '../dto/list-filtered-books.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) { }

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  findAll(@Query() filterQueryParams: GetBooksQuery) {
    console.log(filterQueryParams);
    return this.booksService.findAll(filterQueryParams);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(+id);
  }
}
