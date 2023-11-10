import { AuthorPresenter } from 'library-api/src/controllers/authors/author.presenter';
import { GenrePresenter } from 'library-api/src/controllers/genres/genre.presenter';
import { BookId } from 'library-api/src/entities';
import { BookModel, PlainBookModel } from 'library-api/src/models';

export class PlainBookPresenter {
  id: BookId;

  name: string;

  writtenOn: Date;

  genres: GenrePresenter[];

<<<<<<< HEAD
  author: AuthorPresenter;
=======
  author: PlainAuthorPresenter;
>>>>>>> 13b9bd6cc660e7ec19cdc50909257fef9fb3afbd

  private constructor(data: PlainBookPresenter) {
    Object.assign(this, data);
  }

  public static from(data: PlainBookModel): PlainBookPresenter {
    return new PlainBookPresenter({
      id: data.id,
      name: data.name,
      writtenOn: data.writtenOn,
<<<<<<< HEAD
      author: AuthorPresenter.from(data.author),
=======
      author: PlainAuthorPresenter.from(data.author),
>>>>>>> 13b9bd6cc660e7ec19cdc50909257fef9fb3afbd
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
<<<<<<< HEAD
      author: AuthorPresenter.from(data.author),
=======
      author: PlainAuthorPresenter.from(data.author),
>>>>>>> 13b9bd6cc660e7ec19cdc50909257fef9fb3afbd
      genres: data.genres,
    });
  }
}
