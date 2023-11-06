export type PlainBookModel = {
  id: string;
  name: string;
  author: {
    id: string,
    firstName: string,
    lastName: string,
  };
  writtenOn: string;
  genres: [];
};
