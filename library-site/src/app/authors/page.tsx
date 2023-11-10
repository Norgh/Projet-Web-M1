'use client';

import React, { FC, useState } from 'react';
import Image from 'next/image';
import { AddAuthorInput } from '../../models/author.model';
import { useListAuthors } from '@/hooks';
import { AddAuthorModal } from '@/components/modal/authorModal';

const AuthorsPage: FC = () => {
  const { authors, add } = useListAuthors();
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
      <br />
      <input
        type="text"
        className="w-64 p-2 rounded border border-gray-300 focus:outline-none text-black"
        placeholder="Recherche"
      />
      <br />
      <br />
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
