import { PlainGenreModel } from './genre.model';

export type PlainBookModel = {
  id: string;
  name: string;
  author: {
    id: string;
    firstName: string;
    lastName: string;
    photoUrl?: string;
  };
  writtenOn: string;
  genres: PlainGenreModel[];
};

export type SmallBookModel = {
  id: string;
  name: string;
};

export type AddBookInput = {
  name: string;
  writtenOn: string;
  authorId: string;
  genresId: string[];
};
