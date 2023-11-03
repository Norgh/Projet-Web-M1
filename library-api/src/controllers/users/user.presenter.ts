import { UserId } from 'library-api/src/entities';
import { PlainUserModel } from 'library-api/src/models';

export class PlainUserPresenter {
  id: UserId;

  firstName: string;

  lastName: string;

  favoriteBook: string;

  ownedBooks: string[];

  favoriteGenres: string[];

  friendList: string[];

  private constructor(data: PlainUserPresenter) {
    Object.assign(this, data);
  }

  public static from(data: PlainUserModel): PlainUserPresenter {
    return new PlainUserPresenter({
      id: data.id,
      firstName: data.firstName,
      lastName: data.lastName,
      favoriteBook: data.favoriteBook,
      ownedBooks: data.ownedBooks,
      favoriteGenres: data.favoriteGenres,
      friendList: data.friendList,
    });
  }
}
