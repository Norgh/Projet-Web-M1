import { Body, Controller, Get, Param, Post, Delete } from '@nestjs/common';
import { PlainAuthorPresenter } from 'library-api/src/controllers/authors/author.presenter';
import { AuthorId } from 'library-api/src/entities';
import { AuthorUseCases } from 'library-api/src/useCases';
import { CreatePlainAuthorDto, validateAuthorCreation } from './author.dto';

@Controller('authors')
export class AuthorController {
  constructor(private readonly authorUseCases: AuthorUseCases) {}

  @Get('/')
  public async getAll(): Promise<PlainAuthorPresenter[]> {
    const authors = await this.authorUseCases.getAllPlain();

    return authors.map(PlainAuthorPresenter.from);
  }

  @Get('/:id')
  public async getById(
    @Param('id') id: AuthorId,
  ): Promise<PlainAuthorPresenter> {
    const author = await this.authorUseCases.getById(id);

    return PlainAuthorPresenter.from(author);
  }

  @Post()
  public async createAuthor(
    @Body() input: CreatePlainAuthorDto,
  ): Promise<PlainAuthorPresenter> {
    validateAuthorCreation(input);
    const author = await this.authorUseCases.createPlainAuthor(input);

    return PlainAuthorPresenter.from(author);
  }

  @Delete('/:id')
  public async deleteAuthor(@Param('id') id: AuthorId): Promise<void> {
    await this.authorUseCases.deletePlainAuthor(id);
  }
}
