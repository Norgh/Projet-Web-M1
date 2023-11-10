import React, { ChangeEvent, FC, useState } from 'react';
import { PlainGenreModel, SortBook } from '@/models';
import { useListGenres } from '@/hooks/providers/genreProviders';

type BookFiltersProps = {
  sort: SortBook;
  setSort: (input: SortBook) => void;
  search: string;
  setSearch: (input: string) => void;
  filterGenres: PlainGenreModel[];
  setFilterGenres: (input: PlainGenreModel[]) => void;
};

export const BookFilters: FC<BookFiltersProps> = ({
  sort,
  setSort,
  search,
  setSearch,
  filterGenres,
  setFilterGenres,
}) => {
  const sorts: SortBook[] = [
    { field: 'year', direction: 'asc', name: 'Année de parution' },
    { field: 'year', direction: 'desc', name: 'Année de parution' },
    { field: 'title', direction: 'asc', name: 'Titre' },
    { field: 'title', direction: 'desc', name: 'Titre' },
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
