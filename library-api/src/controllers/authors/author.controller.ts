import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Patch,
} from '@nestjs/common';
import { AuthorPresenter } from 'library-api/src/controllers/authors/author.presenter';
import { AuthorId } from 'library-api/src/entities';
import { AuthorUseCases } from 'library-api/src/useCases';
import { CreateAuthorDto, UpdateAuthorDto } from './author.dto';

@Controller('authors')
export class AuthorController {
  constructor(private readonly authorUseCases: AuthorUseCases) {}

  @Get('/')
  public async getAll(): Promise<AuthorPresenter[]> {
    const authors = await this.authorUseCases.getAllPlain();

    return authors.map(AuthorPresenter.from);
  }

  @Get('/:id')
  public async getById(@Param('id') id: AuthorId): Promise<AuthorPresenter> {
    const author = await this.authorUseCases.getById(id);

    return AuthorPresenter.from(author);
  }

  @Post()
  public async createAuthor(
    @Body() input: CreateAuthorDto,
  ): Promise<AuthorPresenter> {
    const author = await this.authorUseCases.createPlainAuthor(input);

    return AuthorPresenter.from(author);
  }

  @Patch('/:id')
  public async patchAuthor(
    @Param('id') id: AuthorId,
    @Body() input: UpdateAuthorDto,
  ): Promise<void> {
    await this.authorUseCases.patchAuthor(id, input);
  }

  @Delete('/:id')
  public async deleteAuthor(@Param('id') id: AuthorId): Promise<void> {
    await this.authorUseCases.deletePlainAuthor(id);
  }
}
