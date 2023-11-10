<<<<<<< HEAD
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
=======
import { Body, Controller, Get, Param, Post, Delete } from '@nestjs/common';
import { PlainAuthorPresenter } from 'library-api/src/controllers/authors/author.presenter';
import { AuthorId } from 'library-api/src/entities';
import { AuthorUseCases } from 'library-api/src/useCases';
import { CreatePlainAuthorDto, validateAuthorCreation } from './author.dto';
>>>>>>> 13b9bd6cc660e7ec19cdc50909257fef9fb3afbd

@Controller('authors')
export class AuthorController {
  constructor(private readonly authorUseCases: AuthorUseCases) {}

  @Get('/')
<<<<<<< HEAD
  public async getAll(): Promise<AuthorPresenter[]> {
    const authors = await this.authorUseCases.getAllPlain();

    return authors.map(AuthorPresenter.from);
  }

  @Get('/:id')
  public async getById(@Param('id') id: AuthorId): Promise<AuthorPresenter> {
    const author = await this.authorUseCases.getById(id);

    return AuthorPresenter.from(author);
=======
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
>>>>>>> 13b9bd6cc660e7ec19cdc50909257fef9fb3afbd
  }

  @Post()
  public async createAuthor(
<<<<<<< HEAD
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
=======
    @Body() input: CreatePlainAuthorDto,
  ): Promise<PlainAuthorPresenter> {
    validateAuthorCreation(input);
    const author = await this.authorUseCases.createPlainAuthor(input);

    return PlainAuthorPresenter.from(author);
>>>>>>> 13b9bd6cc660e7ec19cdc50909257fef9fb3afbd
  }

  @Delete('/:id')
  public async deleteAuthor(@Param('id') id: AuthorId): Promise<void> {
    await this.authorUseCases.deletePlainAuthor(id);
  }
}
