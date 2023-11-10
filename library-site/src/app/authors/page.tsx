'use client';

import React, { FC, useState } from 'react';
import Image from 'next/image';
import { AddAuthorInput } from '../../models/author.model';
import { useListAuthors } from '@/hooks';
import { AddAuthorModal } from '@/components/modal/authorModal';
import { AuthorsFilters } from '@/components/filter/authorFilter';
import { SortAuthor } from '@/models';

const AuthorsPage: FC = () => {
  const [sort, setSort] = useState<SortAuthor>({
    field: 'booksWritten',
    direction: 'asc',
    name: 'Nombre de livres',
  });
  const [search, setSearch] = useState('');
  const { authors, add } = useListAuthors({ sort, search });
  const [isAddMode, setIsAddMode] = useState<boolean>(false);
  const path = '/images/authors/';

  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold">Auteurs</h1>
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
      <AuthorsFilters
        sort={sort}
        setSort={setSort}
        search={search}
        setSearch={setSearch}
      />
      <div className="flex">
        {authors.map((author) => (
          <div key={author.id} className="p-4 w-fit">
            <a href={`authors/${author.id}`}>
              <h1 className="text-lg font-semibold">
                <b>{author.firstName}</b>
                &nbsp;
                <b>{author.lastName}</b>
              </h1>
              {author?.photoUrl && (
                <p>
                  <Image
                    src={path + author.photoUrl}
                    alt={`${author.firstName} ${author.lastName}`}
                    width={250}
                    height={250}
                  />
                </p>
              )}
              {author?.booksWritten && (
                <p>
                  {author?.booksWritten}
                  &nbsp;livres écrits
                </p>
              )}
            </a>
          </div>
        ))}
      </div>
      <AddAuthorModal
        isOpen={isAddMode}
        onClose={(): void => setIsAddMode(false)}
        SetAuthor={(author: AddAuthorInput): void => add(author)}
      />
    </div>
  );
};

export default AuthorsPage;
