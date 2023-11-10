import { PlainAuthorModel, AuthorModel } from 'library-api/src/models';
import {
  CreateAuthorRepositoryInput,
  UpdateAuthorRepositoryInput,
} from 'library-api/src/repositories/authors/author.repository.type';

export type PlainAuthorUseCasesOutput = PlainAuthorModel;
export type AuthorUseCasesOutput = AuthorModel;
export type CreateAuthorUseCasesInput = CreateAuthorRepositoryInput;
export type UpdateAuthorUseCasesInput = UpdateAuthorRepositoryInput;
