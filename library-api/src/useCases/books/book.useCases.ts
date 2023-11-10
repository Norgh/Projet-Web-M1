import { Injectable } from '@nestjs/common';
import { BookId, Genre } from 'library-api/src/entities';
import { BookRepository } from 'library-api/src/repositories';
import {
  AddBookUseCaseInput,
  BookUseCasesOutput,
  PlainBookUseCasesOutput,
  UpdateBookUseCaseInput,
} from 'library-api/src/useCases/books/book.useCases.type';

@Injectable()
export class BookUseCases {
  constructor(private readonly bookRepository: BookRepository) {}

  /**
   * Get all plain books
   * @returns Array of plain books
   */
  public async getAllPlain(): Promise<PlainBookUseCasesOutput[]> {
    return this.bookRepository.getAllPlain();
  }

  /**
   * Get a book by its ID
   * @param id Book's ID
   * @returns Book if found
   * @throws 404: book with this ID was not found
   */
  public async getById(id: BookId): Promise<PlainBookUseCasesOutput> {
    return this.bookRepository.getById(id);
  }

  /**
   * Create a new book
   * @param bookData Book's data
   * @returns Created book
   * @throws 400: invalid data
   */
  public async createBook(
    bookData: AddBookUseCaseInput,
  ): Promise<PlainBookUseCasesOutput> {
    return this.bookRepository.createBook(bookData);
  }

  /**
   * Patch book
   * @param id Book's ID
   * @Param create the new book
   * @returns  Book
   */
  public async patchBook(
    id: BookId,
    input: UpdateBookUseCaseInput,
  ): Promise<PlainBookUseCasesOutput> {
    const author = await this.getById(id);
    return this.bookRepository.patchBook(author.id, input);
  }

  public async deletePlainBook(id: BookId): Promise<void> {
    const book = await this.getById(id);
    await this.bookRepository.deleteBook(book.id);
  }

  /**
   * Add a genre to a book and save it in the database
   * @param bookId Book's ID
   * @param genreId Genre's ID
   * @returns Updated book
   */
  public async createBookGenres(
    bookId: BookId,
    genre: Genre,
  ): Promise<BookUseCasesOutput> {
    return this.bookRepository.createBookGenres(bookId, genre);
  }
}
