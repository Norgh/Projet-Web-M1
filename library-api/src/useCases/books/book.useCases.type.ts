import { BookModel, PlainBookModel } from 'library-api/src/models';
import {
  AddBookRepositoryInput,
  UpdateBookRepositoryInput,
} from 'library-api/src/repositories/books/book.repository.type';

export type PlainBookUseCasesOutput = PlainBookModel;
export type BookUseCasesOutput = BookModel;
export type AddBookUseCaseInput = AddBookRepositoryInput;
export type UpdateBookUseCaseInput = UpdateBookRepositoryInput;
