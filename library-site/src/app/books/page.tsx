'use client';

import React, { FC, useState } from 'react';
import { AddBookInput, PlainGenreModel, SortBook } from '@/models';
import { useListBooks } from '@/hooks';
import { AddBookModal } from '@/components/modal/bookModal';
import { BookFilters } from '@/components/filter/bookFilter';

const BooksPage: FC = () => {
  const [sort, setSort] = useState<SortBook>({
    field: 'year',
    direction: 'asc',
    name: 'Année de parution',
  });
  const [search, setSearch] = useState('');
  const [filterGenres, setFilterGenres] = useState<PlainGenreModel[]>([]);
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
          <div key={book.id}>
            <a
              className="flex flex-col items-center bg-orange-800 border-2 border-orange-950 p-4 w-60 h-72 rounded-2xl relative bg-clip-border bg-origin-border bg-center bg-no-repeat bg-contain"
              // style={{ backgroundImage: `url(${path + book.author.photoUrl})` }}
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
                  {book.author.firstName}
                  &nbsp;
                  {book.author.lastName}
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
