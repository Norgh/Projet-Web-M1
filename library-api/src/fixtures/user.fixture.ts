import faker from 'faker';
import { PlainUserModel } from 'library-api/src/models/user.model';

export function createUserFixture(): PlainUserModel {
  return {
    id: faker.datatype.uuid(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    favoriteBook: faker.random.words(3),
    ownedBooks: Array.from({ length: 5 }, () => faker.random.words(3)),
    favoriteGenres: Array.from({ length: 5 }, () => faker.music.genre()),
    friendList: Array.from({ length: 5 }, () => faker.datatype.uuid()),
  };
}
