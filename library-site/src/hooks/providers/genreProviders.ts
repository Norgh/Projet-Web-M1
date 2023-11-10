import axios from 'axios';
import { useState, useEffect } from 'react';
import { PlainGenreModel } from '@/models';

type UseListGenresProvider = {
  genres: PlainGenreModel[];
};

export const useListGenres = (): UseListGenresProvider => {
  const [genres, setGenres] = useState<PlainGenreModel[]>([]);

  /* const fetchBooks = (): void => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/books`)
      .then((data) => setBooks(data.data))
      .catch((err) => console.error(err));
  }; */
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/genres`)
      .then((data) => {
        setGenres(data.data);
      })
      .catch(() => {
        setGenres([]);
      });
  });

  return { genres };
};

type GenreProviders = {
  useListGenres: () => UseListGenresProvider;
};

export const useBooksProviders = (): GenreProviders => ({
  useListGenres,
});
