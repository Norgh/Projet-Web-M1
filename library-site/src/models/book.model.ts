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
