<<<<<<< HEAD
import { PlainAuthorModel, AuthorModel } from 'library-api/src/models';
import {
  CreateAuthorRepositoryInput,
  UpdateAuthorRepositoryInput,
} from 'library-api/src/repositories/authors/author.repository.type';

export type PlainAuthorUseCasesOutput = PlainAuthorModel;
export type AuthorUseCasesOutput = AuthorModel;
export type CreateAuthorUseCasesInput = CreateAuthorRepositoryInput;
export type UpdateAuthorUseCasesInput = UpdateAuthorRepositoryInput;
=======
import { PlainAuthorModel } from 'library-api/src/models';
import { CreateAuthorRepositoryInput } from 'library-api/src/repositories/authors/author.repository.type';

export type PlainAuthorUseCasesOutput = PlainAuthorModel;
export type CreateAuthorUseCasesInput = CreateAuthorRepositoryInput;
>>>>>>> 13b9bd6cc660e7ec19cdc50909257fef9fb3afbd
