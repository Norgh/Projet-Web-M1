'use client';

import Image from 'next/image';
import { useParams } from 'next/navigation';
import React, { FC } from 'react';
import { useGetBook } from '@/hooks';

const BooksDetailsPage: FC = () => {
  const { id } = useParams();
  const path = '/images/authors/';
  const { book, update } = useGetBook(id as string);

  return (
    <div className="text-center">
      <p className="m-2">
        <a
          className="bg-gray-700 text-white py-2 px-4 rounded-lg m-2 hover:opacity-70 w-1/4 mx-auto"
          href="../books"
        >
          Retour à liste des livres
        </a>
      </p>
      {book && <h1 className="text-2xl font-bold">{book.name}</h1>}
      <br />
      {book && (
        <p>
          {book.author.firstName}
          &nbsp;
          {book.author.lastName}
        </p>
      )}
      {book && book.author && book.author.photoUrl && (
        <p className="flex justify-center">
          <Image
            className="m-3"
            src={path + book.author.photoUrl}
            alt={`${book.author.firstName} ${book.author.lastName}`}
            width={250}
            height={250}
          />
        </p>
      )}
      {book && book.genres && (
        <p>
          Genre:&nbsp;
          {book.genres.map((genre) => (
            <span>
              {genre.name}
              &nbsp;
            </span>
          ))}
        </p>
      )}
    </div>
  );
};

export default BooksDetailsPage;
