'use client';

import React, { ChangeEvent, FC, useState } from 'react';
import { AddBookInput, Sort } from '@/models';
import { useListBooks } from '@/hooks';
import { useListGenres } from '@/hooks/providers/genreProviders';
import { AddBookModal } from '@/components/modal/bookModal';

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
    { field: 'year', direction: 'asc' },
    { field: 'year', direction: 'desc' },
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
          onChange={(e: ChangeEvent<HTMLSelectElement>): void => {
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
          Ajouter le filtre
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
  const [sort, setSort] = useState<Sort>({ field: 'year', direction: 'asc' });
  const [search, setSearch] = useState('');
  const [filterGenres, setFilterGenres] = useState<string[]>([]);
  const { books, add } = useListBooks({ sort, search, genres: filterGenres });
  const [isAddMode, setIsAddMode] = useState<boolean>(false);

  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold">Bibliothèque</h1>
      <div className="flex justify-center pt-2">
        <button
          type="button"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-2xl"
          onClick={(): void => setIsAddMode(true)}
        >
          Ajouter
          <span className="ml-2">+</span>
        </button>
      </div>
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
      <AddBookModal
        isOpen={isAddMode}
        onClose={(): void => setIsAddMode(false)}
        SetBook={(book: AddBookInput): void => add(book)}
      />
    </div>
  );
};

export default BooksPage;
