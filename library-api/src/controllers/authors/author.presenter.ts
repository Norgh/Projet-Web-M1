import { AuthorId } from 'library-api/src/entities';
import {
  AuthorModel,
  PlainAuthorModel,
  SmallBookModel,
} from 'library-api/src/models';
// eslint-disable-next-line import/no-cycle
import { SmallBookPresenter } from '../books/book.presenter';

export class PlainAuthorPresenter {
  id: AuthorId;

  firstName: string;

  lastName: string;

  photoUrl?: string;

  books: SmallBookModel[];

  private constructor(data: PlainAuthorPresenter) {
    Object.assign(this, data);
  }

  public static from(data: PlainAuthorModel): PlainAuthorPresenter {
    return new PlainAuthorPresenter({
      id: data.id,
      firstName: data.firstName,
      lastName: data.lastName,
      photoUrl: data.photoUrl,
      books: data.books.map(SmallBookPresenter.from),
    });
  }
}

export class AuthorPresenter {
  id: AuthorId;

  firstName: string;

  lastName: string;

  photoUrl?: string;

  booksWritten?: number;

  private constructor(data: AuthorPresenter) {
    Object.assign(this, data);
  }

  public static from(data: AuthorModel): AuthorPresenter {
    return new AuthorPresenter({
      id: data.id,
      firstName: data.firstName,
      lastName: data.lastName,
      photoUrl: data.photoUrl,
      booksWritten: data.booksWritten,
    });
  }
}
