import faker from 'faker';
import { BookId, Author } from 'library-api/src/entities';
import {
  PlainBookModel,
  BookModel,
  SmallBookModel,
} from 'library-api/src/models/book.model';
// eslint-disable-next-line import/no-cycle
import { createAuthorFixture } from './author.fixture';
import { createGenreFixture } from './genre.fixture';

export function createPlainBookFixture(): PlainBookModel {
  return {
    id: faker.datatype.uuid() as BookId,
    name: faker.random.words(3),
    writtenOn: faker.date.past(),
    author: createAuthorFixture(),
    genres: Array.from({ length: 5 }, createGenreFixture),
  };
}

export function createBookFixture(): BookModel {
  return {
    id: faker.datatype.uuid() as BookId,
    name: faker.random.words(3),
    writtenOn: faker.date.past(),
    author: createAuthorFixture() as Author,
    genres: Array.from({ length: 5 }, () => faker.music.genre()),
  };
}

export function createSmallBookFixture(): SmallBookModel {
  return {
    id: faker.datatype.uuid() as BookId,
    name: faker.random.words(3),
  };
}
