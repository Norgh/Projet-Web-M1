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
        console.log(data);
      });
  }, [id]);

  return (
    <div className="text-center">
      {books && <h1 className="text-2xl font-bold">{books.name}</h1>}
      <br />
      <br />
      {books && (
        <p>
          {books.author.firstName}
          &nbsp;
          {books.author.lastName}
        </p>
      )}
      {books && books.author && books.author.photoUrl && (
        <p>
          <Image
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
