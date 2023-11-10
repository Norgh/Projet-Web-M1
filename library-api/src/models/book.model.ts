import { Author, BookId } from 'library-api/src/entities';
import { AuthorModel } from 'library-api/src/models/author.model';
import { GenreModel } from 'library-api/src/models/genre.model';

export type PlainBookModel = {
  id: BookId;
  name: string;
  writtenOn: Date;
<<<<<<< HEAD
  author: AuthorModel;
=======
  author: PlainAuthorModel;
>>>>>>> 13b9bd6cc660e7ec19cdc50909257fef9fb3afbd
  genres: GenreModel[];
};

export type BookModel = {
  id: BookId;
  name: string;
  writtenOn: Date;
  author: Author;
  genres: string[];
};
