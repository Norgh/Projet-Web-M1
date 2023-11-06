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
}
