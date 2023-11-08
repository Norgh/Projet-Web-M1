'use client';

import React, { ChangeEvent, FC, useState } from 'react';
import { Sort } from '@/models';
import { useListBooks } from '@/hooks';
import { useListGenres } from '@/hooks/providers/genreProviders'; 

type BookFiltersProps = {
  sort: Sort;
  setSort: (input: Sort) => void;
  search: string;
  setSearch: (input: string) => void;
  filterGenres: string[];
  setFilterGenres: (input: string[]) => void;
};

const BookFilters: FC<BookFiltersProps> = ({
  sort,
  setSort,
  search,
  setSearch,
  filterGenres,
  setFilterGenres,
}) => {
  const sorts: Sort[] = [
    { field: 'id', direction: 'asc' },
    { field: 'id', direction: 'desc' },
    { field: 'title', direction: 'asc' },
    { field: 'title', direction: 'desc' },
  ];

  const { genres } = useListGenres();
  const [genreSelect, setGenreSelect] = useState<string>(genres[0]?.name);

  const removeGenre = (genre: string): void => {
    setFilterGenres(
      filterGenres.filter((filterGenre) => filterGenre !== genre),
    );
  };

  const addType = (): void => {
    if (genreSelect && !filterGenres.includes(genreSelect)) {
      setFilterGenres([...filterGenres, genreSelect]);
    }
  };

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
      <div className="w-100">
        <select
          onChange={(e: ChangeEvent<HTMLInputElement>): void => {
            e.preventDefault();
            setGenreSelect(e.target.value);
          }}
          className="text-black w-64 p-2 roundedw-64 p-2 rounded border border-gray-300 focus:outline-none text-black"
        >
          {genres.map((genre) => (
            <option value={genre.name}>{genre.name}</option>
          ))}
        </select>
        <button
          className="bg-gray-700 text-white py-2 px-4 rounded-lg m-2 hover:opacity-70"
          type="button"
          onClick={addType}
        >
          Add filter
        </button>
        <div className="flex flex-row gap-4">
          {filterGenres.map((genre) => (
            <button
              className="border-2 border-grey-400 rounded-lg p-2"
              key={genre}
              type="button"
              onClick={(): void => removeGenre(genre)}
            >
              {genre} X
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const BooksPage: FC = () => {
  const [sort, setSort] = useState<Sort>({ field: 'id', direction: 'asc' });
  const [search, setSearch] = useState('');
  const [filterGenres, setFilterGenres] = useState<string[]>([]);
  const { books } = useListBooks({ sort, search, genres: filterGenres });

  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold">Bibliothèque</h1>
      <BookFilters
        sort={sort}
        setSort={setSort}
        search={search}
        setSearch={setSearch}
        filterGenres={filterGenres}
        setFilterGenres={setFilterGenres}
      />
      <div className="flex justify-evenly flex-wrap gap-6 p-6">
        {books.map((book) => (
          <div
            key={book.id}
            className="bg-orange-800 border-2 border-orange-950 p-4 w-60 h-72 rounded-2xl"
          >
            <a href={`books/${book.id}`}>
              <h2 className="text-2xl font-semibold mb-8">{book.name}</h2>
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
