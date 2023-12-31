import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, IsOptional } from 'class-validator';
import { AuthorId, GenreId } from 'library-api/src/entities';

export class CreateBookDto {
  @ApiProperty({ required: true, type: 'string' })
  @IsString()
  name: string;

  @ApiProperty({ required: true, type: 'string' })
  @IsString()
  writtenOn: string;

  @ApiProperty({ required: true, type: 'string', format: 'uuid' })
  @IsUUID(4)
  author: AuthorId;

  @ApiProperty({
    required: true,
    isArray: true,
    type: 'string',
    format: 'uuid',
  })
  @IsUUID(4, { each: true })
  genresId: GenreId[];
}

export class UpdateBookDto {
  @ApiProperty({ required: false, type: 'string' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ required: false, type: 'string' })
  @IsString()
  @IsOptional()
  writtenOn?: string;

  @ApiProperty({ required: false, type: 'string', format: 'uuid' })
  @IsUUID(4)
  @IsOptional()
  author?: AuthorId;

  @ApiProperty({
    required: true,
    isArray: true,
    type: 'string',
    format: 'uuid',
  })
  @IsUUID(4, { each: true })
  @IsOptional()
  genresId?: GenreId[];
}
