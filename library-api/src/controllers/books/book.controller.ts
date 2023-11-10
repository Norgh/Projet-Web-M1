import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
import { PlainBookPresenter } from 'library-api/src/controllers/books/book.presenter';
import { BookId } from 'library-api/src/entities';
import { BookUseCases } from 'library-api/src/useCases';
import { CreateBookDto, UpdateBookDto } from './book.dto';

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

  @Patch('/:id')
  public async patchAuthor(
    @Param('id') id: BookId,
    @Body() input: UpdateBookDto,
  ): Promise<PlainBookPresenter> {
    const author = await this.bookUseCases.patchBook(id, input);

    return PlainBookPresenter.from(author);
  }

  @Post('/')
  public async createBook(
    @Body() bookData: CreateBookDto,
  ): Promise<PlainBookPresenter> {
    return this.bookUseCases.createBook(bookData);
  }

  @Delete('/:id')
  public async deleteAuthor(@Param('id') id: BookId): Promise<void> {
    await this.bookUseCases.deletePlainBook(id);
  }
}
