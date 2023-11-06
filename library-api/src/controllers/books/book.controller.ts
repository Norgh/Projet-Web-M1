import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import {
  BookPresenter,
  PlainBookPresenter,
} from 'library-api/src/controllers/books/book.presenter';
import { BookId, Genre, GenreId } from 'library-api/src/entities';
import { BookUseCases } from 'library-api/src/useCases';
import { BookModel, PlainBookModel } from 'library-api/src/models';

@Controller('books')
export class BookController {
  constructor(private readonly bookUseCases: BookUseCases) {}

  @Get('/')
  public async getAll(): Promise<PlainBookPresenter[]> {
    const books = await this.bookUseCases.getAllPlain();

    return books.map(PlainBookPresenter.from);
  }

  @Get('/:id')
  public async getById(@Param('id') id: BookId): Promise<BookPresenter> {
    const book = await this.bookUseCases.getById(id);

    return BookPresenter.from(book);
  }

  @Post('/')
  public async createBook(
    @Body() bookData: BookModel,
  ): Promise<PlainBookModel> {
    const newBook = await this.bookUseCases.createBook(bookData);

    const newGenre = new Genre();
    newGenre.id = bookData.genres[0].id as GenreId;
    newGenre.name = bookData.genres[0].name;

    await this.bookUseCases.createBookGenres(newBook.id, newGenre);

    const plainBook: PlainBookModel = {
      id: newBook.id,
      name: newBook.name,
      writtenOn: newBook.writtenOn,
      author: newBook.author,
      genres: newBook.genres.map((genre) => genre.name) || [],
    };

    return plainBook;
  }
}
