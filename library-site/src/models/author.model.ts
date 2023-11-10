export type PlainAuthorModel = {
  id: string;
  firstName: string;
  lastName: string;
<<<<<<< HEAD
  photoUrl?: string;
  booksWritten?: number;
};

export type AddAuthorInput = {
  firstName: string;
  lastName: string;
  photoUrl?: string;
};

export type UpdateAuthorInput = {
  firstName?: string;
  lastName?: string;
  photoUrl?: string;
=======
  photoUrl: string;
>>>>>>> 13b9bd6cc660e7ec19cdc50909257fef9fb3afbd
};
