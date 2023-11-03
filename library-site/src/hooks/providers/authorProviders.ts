import axios from 'axios';
import { useState } from 'react';
import { PlainAuthorModel } from '@/models';

type UseListAuthorsProvider = {
  Authors: PlainAuthorModel[];
  load: () => void;
};

export const useListAuthors = (): UseListAuthorsProvider => {
  const [Authors, setAuthors] = useState<PlainAuthorModel[]>([]);

  const fetchAuthors = (): void => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/Authors`)
      .then((data) => setAuthors(data.data))
      .catch((err) => console.error(err));
  };

  return { Authors, load: fetchAuthors };
};

type AuthorProviders = {
  useListAuthors: () => UseListAuthorsProvider;
};

export const useAuthorsProviders = (): AuthorProviders => ({
  useListAuthors,
});
