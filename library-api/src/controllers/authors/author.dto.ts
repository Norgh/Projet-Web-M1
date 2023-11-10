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
}
