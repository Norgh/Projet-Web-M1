import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import {
  AddAuthorInput,
  AuthorModel,
  PlainAuthorModel,
  UpdateAuthorInput,
} from '@/models';
import { Redirect } from 'next';

type UseListAuthorsProvider = {
  authors: AuthorModel[];
  add: (addInput: AddAuthorInput) => void;
};

type ListAuthorsInput = {
  search?: string;
};

export const useListAuthors = (
  input?: ListAuthorsInput,
): UseListAuthorsProvider => {
  const [authors, setAuthors] = useState<AuthorModel[]>([]);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/authors`)
      .then((data) => {
        const booksData = data.data;

        const sortedBooks = (booksData as AuthorModel[]).filter(
          ({ firstName, lastName }) =>
            /*
              Erreur non corrigeable : ESLint demande de passer à la ligne mais lorsque l'on
              passe à la ligne il nous demande de ne pas passer à la ligne par la suite
            */
            (input?.search
              ? firstName.toLowerCase().includes(input.search.toLowerCase()) ||
                lastName.toLowerCase().includes(input.search.toLowerCase())
              : true),
          );

        setAuthors(sortedBooks);
      })
      .catch(() => {
        // console.error(err);
        setAuthors([]);
      });
  }, [input?.search, authors]);

  const addAuthor = (addInput: AddAuthorInput): void => {
    axios
      .post<AddAuthorInput, AxiosResponse<AuthorModel>>(
        `${process.env.NEXT_PUBLIC_API_URL}/authors`,
        addInput,
      )
      .then((data) => {
        setAuthors([...authors, data.data]);
      });
  };

  return { authors, add: addAuthor };
};

type UseGetAuthorProvider = {
  author: PlainAuthorModel | undefined;
  update: (addInput: UpdateAuthorInput) => void;
  deleteAuthor: () => void;
};

export const useGetAuthor = (id: string): UseGetAuthorProvider => {
  const [author, setAuthor] = useState<PlainAuthorModel | undefined>(undefined);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/authors/${id}`)
      .then((data) => {
        setAuthor(data.data);
      })
      .catch(() => {
        setAuthor(undefined);
      });
  }, [id]);

  const updateAuthor = (addInput: UpdateAuthorInput): void => {
    axios
      .patch<AddAuthorInput, AxiosResponse<PlainAuthorModel>>(
        `${process.env.NEXT_PUBLIC_API_URL}/authors/${id}`,
        addInput,
      )
      .then((data) => {
        setAuthor(data.data);
      });
  };

  const deleteAuthor = (): void => {
    axios
      .delete<AddAuthorInput, AxiosResponse<PlainAuthorModel>>(
        `${process.env.NEXT_PUBLIC_API_URL}/authors/${id}`,
      )
      .then(() => {
        window.location.href = '../authors';
      });
  };

  return { author, update: updateAuthor, deleteAuthor };
};
