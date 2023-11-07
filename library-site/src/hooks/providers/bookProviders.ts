import axios from 'axios';
import { useState, useEffect } from 'react';
import { PlainBookModel, Sort } from '@/models';

type UseListBooksProvider = {
  books: PlainBookModel[];
};

type ListBooksInput = {
  search?: string;
  sort?: Sort;
};

export const useListBooks = (input?: ListBooksInput): UseListBooksProvider => {
  const [books, setBooks] = useState<PlainBookModel[]>([]);

  /* const fetchBooks = (): void => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/books`)
      .then((data) => setBooks(data.data))
      .catch((err) => console.error(err));
  }; */
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

            if (sort.field === 'name') {
              if (sort.direction === 'asc') {
                return p1.name.localeCompare(p2.name);
              }

              return p2.name.localeCompare(p1.name);
            }

            return 0;
          })
          .filter(
            ({ name }) => (input?.search ? name.toLowerCase().includes(input.search.toLowerCase()) : true),
          );

        setBooks(sortedBooks);
      })
      .catch((err) => {
        console.error(err);
        setBooks([]);
      });
  }, [input?.search, input?.sort]);

  return { books };
};

type BookProviders = {
  useListBooks: () => UseListBooksProvider;
};

export const useBooksProviders = (): BookProviders => ({
  useListBooks,
});
