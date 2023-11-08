export type PlainBookModel = {
  id: string;
  name: string;
  author: {
    id: string;
    firstName: string;
    lastName: string;
    photoUrl: string;
  };
  writtenOn: string;
  genres: [];
};

export type AddBookInput = {
  name: string;
  authorId: string;
  writtenOn: string;
  genres: string[];
};
