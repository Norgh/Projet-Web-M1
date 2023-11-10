import { AuthorId } from 'library-api/src/entities';
// eslint-disable-next-line import/no-cycle
import { SmallBookModel } from './book.model';

export type PlainAuthorModel = {
  id: AuthorId;
  firstName: string;
  lastName: string;
  photoUrl?: string;
  books: SmallBookModel[];
};

export type AuthorModel = {
  id: AuthorId;
  firstName: string;
  lastName: string;
  photoUrl?: string;
  booksWritten?: number;
};
