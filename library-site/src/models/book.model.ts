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
  genres: [];
};

export type AddBookInput = {
  name: string;
  writtenOn: string;
  authorId: string;
  genresId: string[];
};
