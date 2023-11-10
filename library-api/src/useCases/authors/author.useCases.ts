import { Injectable } from '@nestjs/common';
import { AuthorId } from 'library-api/src/entities';
import { AuthorRepository } from 'library-api/src/repositories';
import {
<<<<<<< HEAD
  AuthorUseCasesOutput,
  CreateAuthorUseCasesInput,
  UpdateAuthorUseCasesInput,
=======
  CreateAuthorUseCasesInput,
  PlainAuthorUseCasesOutput,
>>>>>>> 13b9bd6cc660e7ec19cdc50909257fef9fb3afbd
} from 'library-api/src/useCases/authors/author.useCases.type';

@Injectable()
export class AuthorUseCases {
  constructor(private readonly authorRepository: AuthorRepository) {}

  /**
   * Get all plain authors
   * @returns Array of plain authors
   */
<<<<<<< HEAD
  public async getAllPlain(): Promise<AuthorUseCasesOutput[]> {
=======
  public async getAllPlain(): Promise<PlainAuthorUseCasesOutput[]> {
>>>>>>> 13b9bd6cc660e7ec19cdc50909257fef9fb3afbd
    return this.authorRepository.getAllPlain();
  }

  /**
   * Get a author by its ID
   * @param id Author's ID
   * @returns Author if found
   * @throws 404: author with this ID was not found
   */
<<<<<<< HEAD
  public async getById(id: AuthorId): Promise<AuthorUseCasesOutput> {
=======
  public async getById(id: AuthorId): Promise<PlainAuthorUseCasesOutput> {
>>>>>>> 13b9bd6cc660e7ec19cdc50909257fef9fb3afbd
    return this.authorRepository.getById(id);
  }

  /**
   * Create plain author
   * @param id Author's ID
   * @returns Author
   * @throws 404: author with this ID was not found
   */

  public async createPlainAuthor(
    input: CreateAuthorUseCasesInput,
<<<<<<< HEAD
  ): Promise<AuthorUseCasesOutput> {
    return this.authorRepository.createAuthor(input);
  }

  public async patchAuthor(
    id: AuthorId,
    input: UpdateAuthorUseCasesInput,
  ): Promise<void> {
    const author = await this.getById(id);
    await this.authorRepository.patchAuthor(author.id, input);
  }

=======
  ): Promise<PlainAuthorUseCasesOutput> {
    return this.authorRepository.createAuthor(input);
  }

>>>>>>> 13b9bd6cc660e7ec19cdc50909257fef9fb3afbd
  public async deletePlainAuthor(id: AuthorId): Promise<void> {
    const author = await this.getById(id);
    await this.authorRepository.deleteAuthor(author.id);
  }
}
