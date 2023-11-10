<<<<<<< HEAD
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateAuthorDto {
  @ApiProperty({ required: true, type: 'string' })
  @IsString()
  firstName: string;

  @ApiProperty({ required: true, type: 'string' })
  @IsString()
  lastName: string;

  @ApiProperty({ required: false, type: 'string' })
  @IsString()
  @IsOptional()
  photoUrl?: string;
}

export class UpdateAuthorDto {
  @ApiProperty({ required: false, type: 'string' })
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiProperty({ required: false, type: 'string' })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiProperty({ required: false, type: 'string' })
  @IsString()
  @IsOptional()
  photoUrl?: string;
=======
export class CreatePlainAuthorDto {
  firstName: string;

  lastName: string;
}

export function string(data: unknown): boolean {
  return typeof data === 'string';
}

export function validateAuthorCreation(input: CreatePlainAuthorDto): void {
  if (!string(input.firstName) || !string(input.lastName)) {
    throw Error('Author not valid');
  }
>>>>>>> 13b9bd6cc660e7ec19cdc50909257fef9fb3afbd
}
