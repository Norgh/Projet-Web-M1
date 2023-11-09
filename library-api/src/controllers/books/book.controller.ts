import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { PlainBookPresenter } from 'library-api/src/controllers/books/book.presenter';
import { BookId } from 'library-api/src/entities';
import { BookUseCases } from 'library-api/src/useCases';
import { CreateBookDto } from './book.dto';

@Controller('books')
export class BookController {
  constructor(private readonly bookUseCases: BookUseCases) {}

  @Get('/')
  public async getAll(): Promise<PlainBookPresenter[]> {
    const books = await this.bookUseCases.getAllPlain();

    return books.map(PlainBookPresenter.from);
  }

  @Get('/:id')
  public async getById(@Param('id') id: BookId): Promise<PlainBookPresenter> {
    const book = await this.bookUseCases.getById(id);

    return PlainBookPresenter.from(book);
  }

  @Post('/')
  public async createBook(
    @Body() bookData: CreateBookDto,
  ): Promise<PlainBookPresenter> {
    return this.bookUseCases.createBook(bookData);
  }
}
