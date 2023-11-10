import faker from 'faker';
import { AuthorId } from 'library-api/src/entities';
import {
  PlainAuthorModel,
  AuthorModel,
} from 'library-api/src/models/author.model';
// eslint-disable-next-line import/no-cycle
import { createSmallBookFixture } from './book.fixture';

export function createPlainAuthorFixture(): PlainAuthorModel {
  return {
    id: faker.datatype.uuid() as AuthorId,
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    photoUrl: faker.image.imageUrl(),
    books: Array.from({ length: 5 }, createSmallBookFixture),
  };
}

export function createAuthorFixture(): AuthorModel {
  return {
    id: faker.datatype.uuid() as AuthorId,
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    photoUrl: faker.image.imageUrl(),
    booksWritten: faker.datatype.number({ min: 1, max: 100 }),
  };
}
