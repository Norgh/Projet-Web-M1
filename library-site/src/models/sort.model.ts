export type SortBook = {
  field: 'title' | 'year';
  direction: 'asc' | 'desc';
  name: 'Titre' | 'Année de parution';
};

export type SortAuthor = {
  field: 'booksWritten';
  direction: 'asc' | 'desc';
  name: 'Nombre de livres';
};
