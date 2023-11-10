export type PlainAuthorModel = {
  id: string;
  firstName: string;
  lastName: string;
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
};
