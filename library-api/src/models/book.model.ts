import { Author, BookId } from 'library-api/src/entities';
import { AuthorModel } from 'library-api/src/models/author.model';
import { GenreModel } from 'library-api/src/models/genre.model';

export type PlainBookModel = {
  id: BookId;
  name: string;
  writtenOn: Date;
  author: AuthorModel;
  genres: GenreModel[];
};

export type BookModel = {
  id: BookId;
  name: string;
  writtenOn: Date;
  author: Author;
  genres: string[];
};
