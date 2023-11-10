import { AuthorId } from 'library-api/src/entities';

export type PlainAuthorModel = {
  id: AuthorId;
  firstName: string;
  lastName: string;
  photoUrl?: string;
<<<<<<< HEAD
};

export type AuthorModel = {
  id: AuthorId;
  firstName: string;
  lastName: string;
  photoUrl?: string;
  booksWritten?: number;
=======
>>>>>>> 13b9bd6cc660e7ec19cdc50909257fef9fb3afbd
};
