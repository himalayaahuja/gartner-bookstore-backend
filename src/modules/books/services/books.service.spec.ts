import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service';

describe('BooksService', () => {
  let service: BooksService;
  const mockBooksService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BooksService],
    }).overrideProvider(BooksService).useValue(mockBooksService).compile();

    service = module.get<BooksService>(BooksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
