import { Injectable } from '@nestjs/common';
import { GenreRepository } from 'library-api/src/repositories';
import { PlainGenreUseCasesOutput } from './genre.useCase.type';

@Injectable()
export class GenreUseCases {
  constructor(private readonly genreRepository: GenreRepository) {}

  /**
   * Get all plain books
   * @returns Array of plain books
   */
  public async getAllPlain(): Promise<PlainGenreUseCasesOutput[]> {
    return this.genreRepository.getAllPlain();
  }
}
