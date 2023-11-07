'use client';

import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { PlainBookModel, Sort } from '@/models';
import { useListBooks } from '@/hooks';
// import Modal from '../../components/modal/bookModal';

type BookFiltersProps = {
  sort: Sort;
  setSort: (input: Sort) => void;
  search: string;
  setSearch: (input: string) => void;
};

const BookFilters: FC<BookFiltersProps> = ({
  sort,
  setSort,
  search,
  setSearch,
}) => {
  const sorts: Sort[] = [
    { field: 'id', direction: 'asc' },
    { field: 'id', direction: 'desc' },
    { field: 'name', direction: 'asc' },
    { field: 'name', direction: 'desc' },
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
          disabled={
            sort.direction === currentSort.direction
            && sort.field === currentSort.field
          }
        >
          {currentSort.field} {currentSort.direction}
        </button>
      ))}
      <br />
    </div>
  );
};
const BooksPage: FC = () => {
  const [sort, setSort] = useState<Sort>({ field: 'id', direction: 'asc' });
  const [search, setSearch] = useState('');
  const { books } = useListBooks({ sort, search });

  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold">Bibliothèque</h1>
      <BookFilters
        sort={sort}
        setSort={setSort}
        search={search}
        setSearch={setSearch}
      />
      <div className="flex justify-evenly flex-wrap gap-6 p-6">
        {books.map((book) => (
          <div
            key={book.id}
            className="border-4 border-red-700 p-4 w-1/4 rounded-lg"
          >
            <a href={`books/${book.id}`}>
              <p className="text-lg font-semibold">
                Nom:&nbsp;
                <b>{book.name}</b>
              </p>
              <p>
                Genre:&nbsp;
                {book.genres.map((genre) => (
                  <span>
                    {genre}
                    &nbsp;
                  </span>
                ))}
              </p>
              <p>
                Autheur:&nbsp;
                {book.author.lastName}
                &nbsp;
                {book.author.firstName}
              </p>
              <p>
                Année de publication:&nbsp;
                {book.writtenOn}
              </p>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BooksPage;
