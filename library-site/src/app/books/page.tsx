'use client';

import React, { ChangeEvent, FC, useState } from 'react';
import { AddBookInput, PlainGenreModel, Sort } from '@/models';
import { useListBooks } from '@/hooks';
import { useListGenres } from '@/hooks/providers/genreProviders';
import { AddBookModal } from '@/components/modal/bookModal';

type BookFiltersProps = {
  sort: Sort;
  setSort: (input: Sort) => void;
  search: string;
  setSearch: (input: string) => void;
  filterGenres: PlainGenreModel[];
  setFilterGenres: (input: PlainGenreModel[]) => void;
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
  const [genreSelect, setGenreSelect] = useState<PlainGenreModel>(genres[0]);

  const removeGenre = (genre: string): void => {
    setFilterGenres(
      filterGenres.filter((filterGenre) => filterGenre.id !== genre),
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
            const selectedGenre = genres.find(
              (genre) => genre.id === e.target.value,
            );
            if (selectedGenre) {
              setGenreSelect(selectedGenre);
            }
          }}
          className="text-black w-64 p-2 roundedw-64 p-2 rounded border border-gray-300 focus:outline-none text-black"
        >
          {genres.map((genre) => (
            <option value={genre.id}>{genre.name}</option>
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
              className="border-2 border-grey-400 rounded-lg p-2 bg-gray-700"
              key={genre.id}
              type="button"
              onClick={(): void => removeGenre(genre.id)}
            >
              {genre.name}
              <span className="ml-2 text-red-600 font-black">X</span>
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
  const [filterGenres, setFilterGenres] = useState<PlainGenreModel[]>([]);
  const { books, add } = useListBooks({ sort, search, genres: filterGenres });
  const [isAddMode, setIsAddMode] = useState<boolean>(false);
  const path = '/images/authors/';

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
          <div key={book.id}>
            <a
              className="flex flex-col items-center bg-orange-800 border-2 border-orange-950 p-4 w-60 h-72 rounded-2xl relative bg-clip-border bg-origin-border bg-center bg-no-repeat bg-contain"
              style={{ backgroundImage: `url(${path + book.author.photoUrl})` }}
              href={`books/${book.id}`}
            >
              <h2 className="text-2xl font-semibold mb-1">{book.name}</h2>
              <div className="-rotate-90 absolute -left-4 bottom-7 text-xs flex flex-col">
                {book.genres.map((genre) => (
                  <p>
                    {genre.name}
                    &nbsp;
                  </p>
                ))}
              </div>
              <p className="absolute top-1/2">
                par
                <br />
                <span className="underline text-2xl">
                  {book.author.lastName}
                  &nbsp;
                  {book.author.firstName}
                </span>
              </p>
              <p className="absolute bottom-0 text-center w-max">
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
