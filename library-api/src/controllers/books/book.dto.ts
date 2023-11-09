import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';
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
  authorId: AuthorId;

  @ApiProperty({
    required: true,
    isArray: true,
    type: 'string',
    format: 'uuid',
  })
  @IsUUID(4, { each: true })
  genresId: GenreId[];
}
