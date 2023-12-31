// Importation du model Author qui ne provoque pas de cycle avec SmallBookPresenter
// eslint-disable-next-line import/no-cycle
import { AuthorPresenter } from 'library-api/src/controllers/authors/author.presenter';
import { GenrePresenter } from 'library-api/src/controllers/genres/genre.presenter';
import { BookId } from 'library-api/src/entities';
import {
  BookModel,
  PlainBookModel,
  SmallBookModel,
} from 'library-api/src/models';

export class PlainBookPresenter {
  id: BookId;

  name: string;

  writtenOn: Date;

  genres: GenrePresenter[];

  author: AuthorPresenter;

  private constructor(data: PlainBookPresenter) {
    Object.assign(this, data);
  }

  public static from(data: PlainBookModel): PlainBookPresenter {
    return new PlainBookPresenter({
      id: data.id,
      name: data.name,
      writtenOn: data.writtenOn,
      author: AuthorPresenter.from(data.author),
      genres: data.genres.map(GenrePresenter.from),
    });
  }
}

export class BookPresenter {
  id: string;

  name: string;

  author: AuthorPresenter;

  writtenOn: Date;

  genres: string[];

  private constructor(data: BookPresenter) {
    Object.assign(this, data);
  }

  public static from(data: BookModel): BookPresenter {
    return new BookPresenter({
      id: data.id,
      name: data.name,
      writtenOn: data.writtenOn,
      author: AuthorPresenter.from(data.author),
      genres: data.genres,
    });
  }
}

export class SmallBookPresenter {
  id: BookId;

  name: string;

  private constructor(data: SmallBookPresenter) {
    Object.assign(this, data);
  }

  public static from(data: SmallBookModel): SmallBookPresenter {
    return new SmallBookPresenter({
      id: data.id,
      name: data.name,
    });
  }
}
