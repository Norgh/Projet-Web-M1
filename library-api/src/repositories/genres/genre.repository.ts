import { Injectable } from '@nestjs/common';
import { Genre } from 'library-api/src/entities';
import { DataSource, Repository } from 'typeorm';
import { GenreRepositoryOutput } from './genre.repository.type';

@Injectable()
export class GenreRepository extends Repository<Genre> {
  constructor(public readonly dataSource: DataSource) {
    super(Genre, dataSource.createEntityManager());
  }

  /**
   * Get all plain books
   * @returns Array of plain books
   */
  public async getAllPlain(): Promise<GenreRepositoryOutput[]> {
    const books = await this.find({});

    return books;
  }
}
