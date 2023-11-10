import { Injectable } from '@nestjs/common';
import { NotFoundError } from 'library-api/src/common/errors';
import {
  AuthorPresenter,
  PlainAuthorPresenter,
} from 'library-api/src/controllers/authors/author.presenter';
import { Author, AuthorId } from 'library-api/src/entities';
import {
  AuthorRepositoryOutput,
  CreateAuthorRepositoryInput,
  PlainAuthorRepositoryOutput,
  UpdateAuthorRepositoryInput,
} from 'library-api/src/repositories/authors/author.repository.type';
import { DataSource, Repository } from 'typeorm';
import { v4 } from 'uuid';

@Injectable()
export class AuthorRepository extends Repository<Author> {
  constructor(public readonly dataSource: DataSource) {
    super(Author, dataSource.createEntityManager());
  }

  /**
   * Get all plain authors
   * @returns Array of plain authors
   */
  public async getAllPlain(): Promise<AuthorRepositoryOutput[]> {
    const authors = await this.find({
      // Add a relation for authors
      order: { lastName: 'ASC' },
      relations: { books: true },
    });
    // authors.map((author) => {...author, booksWritten: authors.length()});

    const authorsTransformed: AuthorRepositoryOutput[] = authors.map(
      (author) => ({
        ...author,
        booksWritten: author.books.length,
      }),
    );

    return authorsTransformed.map(AuthorPresenter.from);
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
      relations: { books: true },
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
  ): Promise<AuthorRepositoryOutput> {
    const id = await this.dataSource.transaction(async (event) => {
      const [newAuthor] = await event.save<Author>([
        event.create<Author>(Author, {
          ...input,
          id: v4(),
          photoUrl: input.photoUrl ? input.photoUrl : 'default.png',
        }),
      ]);
      return newAuthor.id;
    });
    return this.getById(id);
  }

  /**
   * Create author
   * @Param create the new author
   * @returns  Author
   */

  public async patchAuthor(
    id: AuthorId,
    input: UpdateAuthorRepositoryInput,
  ): Promise<PlainAuthorRepositoryOutput> {
    await this.dataSource.transaction(async (event) => {
      await event.update<Author>(Author, id, input);
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
