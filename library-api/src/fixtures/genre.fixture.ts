import faker from 'faker';
import { GenreId } from 'library-api/src/entities';
import { GenreModel } from 'library-api/src/models/genre.model';

export function createGenreFixture(): GenreModel {
  return {
    id: faker.datatype.uuid() as GenreId,
    name: faker.music.genre(),
  };
}
