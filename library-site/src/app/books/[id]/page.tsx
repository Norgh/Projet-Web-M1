'use client';

import Image from 'next/image';
import { useParams } from 'next/navigation';
import React, { FC, useEffect, useState } from 'react';
import { PlainBookModel } from '../../../models/book.model';

const BooksDetailsPage: FC = () => {
  const { id } = useParams();
  const path = '/images/authors/';
  const [books, setBooks] = useState<PlainBookModel>();

  // Récupération des livres depuis l'API
  useEffect(() => {
    fetch(`http://localhost:3001/books/${id}`)
      .then((response) => response.json())
      .then((data) => {
        // const bookData = data;
        setBooks(data);
        // console.log(data);
      });
  }, [id]);

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
      {books && <h1 className="text-2xl font-bold">{books.name}</h1>}
      <br />
      {books && (
        <p>
          {books.author.firstName}
          &nbsp;
          {books.author.lastName}
        </p>
      )}
      {books && books.author && books.author.photoUrl && (
        <p className="flex justify-center">
          <Image
            className="m-3"
            src={path + books.author.photoUrl}
            alt={`${books.author.firstName} ${books.author.lastName}`}
            width={250}
            height={250}
          />
        </p>
      )}
      {books && books.genres && (
        <p>
          Genre:&nbsp;
          {books.genres.map((genre) => (
            <span>
              {genre}
              &nbsp;
            </span>
          ))}
        </p>
      )}
    </div>
  );
};

export default BooksDetailsPage;
