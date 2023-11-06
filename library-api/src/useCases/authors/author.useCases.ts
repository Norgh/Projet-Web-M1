import { Injectable } from '@nestjs/common';
import { AuthorId } from 'library-api/src/entities';
import { AuthorRepository } from 'library-api/src/repositories';
import {
  CreateAuthorUseCasesInput,
  PlainAuthorUseCasesOutput,
} from 'library-api/src/useCases/authors/author.useCases.type';

@Injectable()
export class AuthorUseCases {
  constructor(private readonly authorRepository: AuthorRepository) {}

  /**
   * Get all plain authors
   * @returns Array of plain authors
   */
  public async getAllPlain(): Promise<PlainAuthorUseCasesOutput[]> {
    return this.authorRepository.getAllPlain();
  }

  /**
   * Get a author by its ID
   * @param id Author's ID
   * @returns Author if found
   * @throws 404: author with this ID was not found
   */
  public async getById(id: AuthorId): Promise<PlainAuthorUseCasesOutput> {
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
  ): Promise<PlainAuthorUseCasesOutput> {
    return this.authorRepository.createAuthor(input);
  }

  public async deletePlainAuthor(id: AuthorId): Promise<void> {
    const author = await this.getById(id);
    await this.authorRepository.deleteAuthor(author.id);
  }
}
