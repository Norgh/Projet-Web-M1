import axios, { AxiosResponse } from 'axios';
import { useState, useEffect } from 'react';
import {
  AddBookInput,
  UpdateBookInput,
  PlainBookModel,
  PlainGenreModel,
  SortBook,
} from '@/models';

type UseListBooksProvider = {
  books: PlainBookModel[];
  add: (addInput: AddBookInput) => void;
};

type ListBooksInput = {
  search?: string;
  sort?: SortBook;
  genres?: PlainGenreModel[];
};

export const useListBooks = (input?: ListBooksInput): UseListBooksProvider => {
  const [books, setBooks] = useState<PlainBookModel[]>([]);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/books`)
      .then((data) => {
        const booksData = data.data;

        const sort = input?.sort ?? { field: 'year', direction: 'asc' };

        const arrayOfIds: string[] = input?.genres?.map((obj) => obj.id) || [];

        const sortedBooks = (booksData as PlainBookModel[])
          .sort((p1, p2) => {
            if (sort.field === 'year') {
              if (sort.direction === 'asc') {
                return String(p1.writtenOn).localeCompare(String(p2.writtenOn));
              }

              return String(p2.writtenOn).localeCompare(String(p1.writtenOn));
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
            /*
              Erreur non corrigeable : ESLint demande de passer à la ligne mais lorsque l'on
              passe à la ligne il nous demande de ne pas passer à la ligne par la suite
            */
            (input?.search
              ? name.toLowerCase().includes(input.search.toLowerCase())
              : true),
          )
          .filter(({ genres }) =>
              /*
              Erreur non corrigeable : ESLint demande de passer à la ligne mais lorsque l'on
              passe à la ligne il nous demande de ne pas passer à la ligne
              */
            (input?.genres?.length
                ? genres.some((genre) => arrayOfIds!.includes(genre.id))
              : true),
          );

        setBooks(sortedBooks);
      })
      .catch(() => {
        // console.error(err);
        setBooks([]);
      });
  }, [input?.search, input?.sort, input?.genres]);

  const addBook = (addInput: AddBookInput): void => {
    axios
      .post<AddBookInput, AxiosResponse<PlainBookModel>>(
        `${process.env.NEXT_PUBLIC_API_URL}/books`,
        addInput,
      )
      .then((data) => {
        setBooks([...books, data.data]);
      });
  };

  return { books, add: addBook };
};

type UseGetBookProvider = {
  book: PlainBookModel | undefined;
  update: (addInput: UpdateBookInput) => void;
  deleteBook: () => void;
};

export const useGetBook = (id: string): UseGetBookProvider => {
  const [book, setBook] = useState<PlainBookModel>();

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/books/${id}`)
      .then((data) => {
        setBook(data.data);
      })
      .catch(() => {
        setBook(undefined);
      });
  }, [book, id]);

  const updateBook = (addInput: UpdateBookInput): void => {
    axios
      .patch<UpdateBookInput, AxiosResponse<PlainBookModel>>(
        `${process.env.NEXT_PUBLIC_API_URL}/books/${id}`,
        addInput,
      )
      .then((data) => {
        setBook(data.data);
      });
  };

  const deleteBook = (): void => {
    axios
      .delete<AddBookInput, AxiosResponse<PlainBookModel>>(
        `${process.env.NEXT_PUBLIC_API_URL}/books/${id}`,
      )
      .then(() => {
        window.location.href = '../books';
      });
  };

  return { book, update: updateBook, deleteBook };
};
