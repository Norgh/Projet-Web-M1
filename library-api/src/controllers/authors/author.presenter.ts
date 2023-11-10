import { AuthorId } from 'library-api/src/entities';
import { AuthorModel, PlainAuthorModel } from 'library-api/src/models';

export class PlainAuthorPresenter {
  id: AuthorId;

  firstName: string;

  lastName: string;

  photoUrl?: string;

  private constructor(data: PlainAuthorPresenter) {
    Object.assign(this, data);
  }

  public static from(data: PlainAuthorModel): PlainAuthorPresenter {
    return new PlainAuthorPresenter({
      id: data.id,
      firstName: data.firstName,
      lastName: data.lastName,
      photoUrl: data.photoUrl,
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
