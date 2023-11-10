import { AuthorId, GenreId } from 'library-api/src/entities';
import { BookModel, PlainBookModel } from 'library-api/src/models/book.model';

export type PlainBookRepositoryOutput = PlainBookModel;
export type BookRepositoryOutput = BookModel;

export type AddBookRepositoryInput = {
  name: string;
  writtenOn: string;
  authorId: AuthorId;
  genresId: GenreId[];
};
