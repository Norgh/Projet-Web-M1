import React, { ChangeEvent, FC } from 'react';
import { SortAuthor } from '@/models';

type BookFiltersProps = {
  sort: SortAuthor;
  setSort: (input: SortAuthor) => void;
  search: string;
  setSearch: (input: string) => void;
};

export const AuthorsFilters: FC<BookFiltersProps> = ({
  sort,
  setSort,
  search,
  setSearch,
}) => {
  const sorts: SortAuthor[] = [
    { field: 'booksWritten', direction: 'asc', name: 'Nombre de livres' },
    { field: 'booksWritten', direction: 'desc', name: 'Nombre de livres' },
  ];

  return (
    <div>
      <input
        className="w-64 p-2 roundedw-64 p-2 rounded border border-gray-300 focus:outline-none text-black"
        type="text"
        placeholder="Recherche par titre"
        value={search}
        onChange={(e: ChangeEvent<HTMLInputElement>): void => {
          e.preventDefault();
          setSearch(e.target.value);
        }}
      />
      {sorts.map((currentSort) => (
        <button
          className="bg-gray-700 text-white py-2 px-4 rounded-lg m-2 hover:opacity-70"
          key={`${currentSort.direction}-${currentSort.field}`}
          type="button"
          onClick={(): void => setSort(currentSort)}
          // Eslint demande des retours à la ligne qui entrent en conflits entre eux
          // eslint-disable-next-line prettier/prettier
          disabled={sort.direction === currentSort.direction && sort.field === currentSort.field}
        >
          {currentSort.name}
          &nbsp;
          {currentSort.direction === 'asc' ? (
            <span>&#8659;</span>
          ) : (
            <span>&#8657;</span>
          )}
        </button>
      ))}
    </div>
  );
};
