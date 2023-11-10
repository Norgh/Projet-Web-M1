'use client';

import Image from 'next/image';
import { useParams } from 'next/navigation';
import React, { FC, useState } from 'react';
import { useGetBook } from '@/hooks';
import { DeleteBookModal, UpdateBookModal } from '@/components/modal/bookModal';
import { UpdateBookInput } from '@/models';

const BooksDetailsPage: FC = () => {
  const { id } = useParams();
  const path = '/images/authors/';
  const { book, update, deleteBook } = useGetBook(id as string);
  const [isUpdateMode, setIsUpdateMode] = useState<boolean>(false);
  const [isDeleteMode, setIsDeleteMode] = useState<boolean>(false);

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
      <div className="flex justify-evenly">
        <button
          type="button"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-2xl"
          onClick={(): void => setIsUpdateMode(true)}
        >
          Modifier
          <span className="ml-2">+</span>
        </button>
        <button
          type="button"
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded text-2xl"
          onClick={(): void => setIsDeleteMode(true)}
        >
          Supprimer
          <span className="ml-2">X</span>
        </button>
      </div>
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
      <UpdateBookModal
        isOpen={isUpdateMode}
        onClose={(): void => setIsUpdateMode(false)}
        book={book}
        updateBook={(newBook: UpdateBookInput): void => update(newBook)}
      />
      <DeleteBookModal
        isOpen={isDeleteMode}
        onClose={(): void => setIsDeleteMode(false)}
        deleteBook={(): void => deleteBook()}
      />
    </div>
  );
};

export default BooksDetailsPage;
