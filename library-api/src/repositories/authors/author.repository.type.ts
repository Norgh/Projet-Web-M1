<<<<<<< HEAD
import {
  PlainAuthorModel,
  AuthorModel,
} from 'library-api/src/models/author.model';

export type PlainAuthorRepositoryOutput = PlainAuthorModel;
export type AuthorRepositoryOutput = AuthorModel;
export type CreateAuthorRepositoryInput = Omit<PlainAuthorModel, 'id'>;
export type UpdateAuthorRepositoryInput = Partial<CreateAuthorRepositoryInput>;
=======
import { PlainAuthorModel } from 'library-api/src/models/author.model';

export type PlainAuthorRepositoryOutput = PlainAuthorModel;
export type CreateAuthorRepositoryInput = Omit<PlainAuthorModel, 'id'>;
>>>>>>> 13b9bd6cc660e7ec19cdc50909257fef9fb3afbd
