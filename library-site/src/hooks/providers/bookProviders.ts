import axios, { AxiosResponse } from 'axios';
import { useState, useEffect } from 'react';
import { AddBookInput, PlainBookModel, Sort } from '@/models';

type UseListBooksProvider = {
  books: PlainBookModel[];
  add: (addInput: AddBookInput) => void;
};

type ListBooksInput = {
  search?: string;
  sort?: Sort;
  genres?: string[];
};

export const useListBooks = (input?: ListBooksInput): UseListBooksProvider => {
  const [books, setBooks] = useState<PlainBookModel[]>([]);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/books`)
      .then((data) => {
        const booksData = data.data;

        const sort = input?.sort ?? { field: 'id', direction: 'asc' };

        const sortedBooks = (booksData as PlainBookModel[])
          .sort((p1, p2) => {
            if (sort.field === 'id') {
              if (sort.direction === 'asc') {
                return p1.id.localeCompare(p2.id);
              }

              return p2.id.localeCompare(p1.id);
            }

            if (sort.field === 'title') {
              if (sort.direction === 'asc') {
                return p1.name.localeCompare(p2.name);
              }

              return p2.name.localeCompare(p1.name);
            }

            return 0;
          })
          .filter(({ name }) =>
            (input?.search
              ? name.toLowerCase().includes(input.search.toLowerCase())
              : true),
          )
          .filter(({ genres }) =>
            (input?.genres?.length
              ? genres.some((genre) => input.genres!.includes(genre))
              : true),
          );

        setBooks(sortedBooks);
      })
      .catch((err) => {
        console.error(err);
        setBooks([]);
      });
  }, [input?.search, input?.sort]);

  const addBook = (addInput: AddBookInput): void => {
    axios
      .post<AddBookInput, AxiosResponse<PlainBookModel>>(
        `${process.env.NEXT_PUBLIC_API_URL}/books`,
        addInput,
      )
      .then((data) => {
        setBooks([...books, data.data]);
      })
      .catch((err) => console.error(err));
  };

  return { books, add: addBook };
};

type BookProviders = {
  useListBooks: () => UseListBooksProvider;
};

export const useBooksProviders = (): BookProviders => ({
  useListBooks,
});
