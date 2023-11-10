// L'importation de SmallBookModel ne créé pas de cycle car SmallBookModel
// n'implemente pas de classe Author contrairement aux autres classes
// book ce qui peut créer ce conflit
// eslint-disable-next-line import/no-cycle
import { SmallBookModel } from '.';

export type AuthorModel = {
  id: string;
  firstName: string;
  lastName: string;
  photoUrl?: string;
  booksWritten?: number;
};

export type PlainAuthorModel = {
  id: string;
  firstName: string;
  lastName: string;
  photoUrl?: string;
  books?: SmallBookModel[];
};

export type AddAuthorInput = {
  firstName: string;
  lastName: string;
  photoUrl?: string;
};

export type UpdateAuthorInput = {
  firstName?: string;
  lastName?: string;
  photoUrl?: string;
};
