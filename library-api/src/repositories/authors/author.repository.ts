import { Injectable } from '@nestjs/common';
import { NotFoundError } from 'library-api/src/common/errors';
import { PlainAuthorPresenter } from 'library-api/src/controllers/authors/author.presenter';
import { Author, AuthorId } from 'library-api/src/entities';
import {
  PlainAuthorRepositoryOutput,
  CreateAuthorRepositoryInput,
} from 'library-api/src/repositories/authors/author.repository.type';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class AuthorRepository extends Repository<Author> {
  constructor(public readonly dataSource: DataSource) {
    super(Author, dataSource.createEntityManager());
  }

  /**
   * Get all plain authors
   * @returns Array of plain authors
   */
  public async getAllPlain(): Promise<PlainAuthorRepositoryOutput[]> {
    const authors = await this.find({
      // Add a relation for authors
      order: { lastName: 'ASC' },
      relations: { books: true },
    });

    return authors.map(PlainAuthorPresenter.from);
  }

  /**
   * Get a author by its ID
   * @param id Author's ID
   * @returns Author if found
   * @throws 404: author with this ID was not found
   */
  public async getById(id: AuthorId): Promise<PlainAuthorRepositoryOutput> {
    const author = await this.findOne({
      where: { id },
      // relations: { books: true },
    });

    if (!author) {
      throw new NotFoundError(`Author - '${id}'`);
    }

    return PlainAuthorPresenter.from(author);
  }
  /**
   * Create author
   * @Param create the new author
   * @returns  Author
   */

  public async createAuthor(
    input: CreateAuthorRepositoryInput,
  ): Promise<PlainAuthorRepositoryOutput> {
    const id = await this.dataSource.transaction(async (event) => {
      const [newAuthor] = await event.save<Author>([
        event.create<Author>(Author, { ...input }),
      ]);
      return newAuthor.id;
    });
    return this.getById(id);
  }

  /**
   * Delete author
   * @param id author id
   */

  public async deleteAuthor(id: AuthorId): Promise<void> {
    await this.delete(id);
  }
}
