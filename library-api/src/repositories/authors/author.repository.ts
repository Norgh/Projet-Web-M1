import { Injectable } from '@nestjs/common';
import { NotFoundError } from 'library-api/src/common/errors';
<<<<<<< HEAD
import { AuthorPresenter } from 'library-api/src/controllers/authors/author.presenter';
import { Author, AuthorId } from 'library-api/src/entities';
import {
  AuthorRepositoryOutput,
  CreateAuthorRepositoryInput,
  UpdateAuthorRepositoryInput,
=======
import { PlainAuthorPresenter } from 'library-api/src/controllers/authors/author.presenter';
import { Author, AuthorId } from 'library-api/src/entities';
import {
  PlainAuthorRepositoryOutput,
  CreateAuthorRepositoryInput,
>>>>>>> 13b9bd6cc660e7ec19cdc50909257fef9fb3afbd
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
<<<<<<< HEAD
  public async getAllPlain(): Promise<AuthorRepositoryOutput[]> {
=======
  public async getAllPlain(): Promise<PlainAuthorRepositoryOutput[]> {
>>>>>>> 13b9bd6cc660e7ec19cdc50909257fef9fb3afbd
    const authors = await this.find({
      // Add a relation for authors
      order: { lastName: 'ASC' },
      relations: { books: true },
    });
<<<<<<< HEAD
    // authors.map((author) => {...author, booksWritten: authors.length()});

    const authorsTransformed: AuthorRepositoryOutput[] = authors.map(
      (author) => ({
        ...author,
        booksWritten: author.books.length,
      }),
    );

    return authorsTransformed.map(AuthorPresenter.from);
=======

    return authors.map(PlainAuthorPresenter.from);
>>>>>>> 13b9bd6cc660e7ec19cdc50909257fef9fb3afbd
  }

  /**
   * Get a author by its ID
   * @param id Author's ID
   * @returns Author if found
   * @throws 404: author with this ID was not found
   */
<<<<<<< HEAD
  public async getById(id: AuthorId): Promise<AuthorRepositoryOutput> {
=======
  public async getById(id: AuthorId): Promise<PlainAuthorRepositoryOutput> {
>>>>>>> 13b9bd6cc660e7ec19cdc50909257fef9fb3afbd
    const author = await this.findOne({
      where: { id },
      // relations: { books: true },
    });

    if (!author) {
      throw new NotFoundError(`Author - '${id}'`);
    }

<<<<<<< HEAD
    return AuthorPresenter.from(author);
=======
    return PlainAuthorPresenter.from(author);
>>>>>>> 13b9bd6cc660e7ec19cdc50909257fef9fb3afbd
  }
  /**
   * Create author
   * @Param create the new author
   * @returns  Author
   */

  public async createAuthor(
    input: CreateAuthorRepositoryInput,
<<<<<<< HEAD
  ): Promise<AuthorRepositoryOutput> {
    const id = await this.dataSource.transaction(async (event) => {
      const [newAuthor] = await event.save<Author>([
        event.create<Author>(Author, {
          ...input,
          id: v4(),
          photoUrl: input.photoUrl ? input.photoUrl : 'default.png',
        }),
=======
  ): Promise<PlainAuthorRepositoryOutput> {
    const id = await this.dataSource.transaction(async (event) => {
      const [newAuthor] = await event.save<Author>([
        event.create<Author>(Author, { ...input }),
>>>>>>> 13b9bd6cc660e7ec19cdc50909257fef9fb3afbd
      ]);
      return newAuthor.id;
    });
    return this.getById(id);
  }

  /**
<<<<<<< HEAD
   * Create author
   * @Param create the new author
   * @returns  Author
   */

  public async patchAuthor(
    id: AuthorId,
    input: UpdateAuthorRepositoryInput,
  ): Promise<AuthorRepositoryOutput> {
    await this.dataSource.transaction(async (event) => {
      await event.update<Author>(Author, id, input);
    });
    return this.getById(id);
  }

  /**
=======
>>>>>>> 13b9bd6cc660e7ec19cdc50909257fef9fb3afbd
   * Delete author
   * @param id author id
   */

  public async deleteAuthor(id: AuthorId): Promise<void> {
    await this.delete(id);
  }
}
