import {
  PlainAuthorModel,
  AuthorModel,
} from 'library-api/src/models/author.model';

export type PlainAuthorRepositoryOutput = PlainAuthorModel;
export type AuthorRepositoryOutput = AuthorModel;
export type CreateAuthorRepositoryInput = Omit<PlainAuthorModel, 'id'>;
export type UpdateAuthorRepositoryInput = Partial<CreateAuthorRepositoryInput>;
