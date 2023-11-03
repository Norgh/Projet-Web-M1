import { UserId } from 'library-api/src/entities';

export type PlainUserModel = {
  id: UserId;
  firstName: string;
  lastName: string;
  favoriteBook: string;
  ownedBooks: string[];
  favoriteGenres: string[];
  friendList: string[];
};
