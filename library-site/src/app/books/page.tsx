'use client';

import React, { FC, useEffect, useState } from 'react';
import { PlainBookModel } from '../../models/book.model';

const BooksPage: FC = () => {
  const [sortBy, setSortBy] = useState<'asc' | 'desc'>('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBooks, setFilteredBooks] = useState<PlainBookModel[]>([]);
  const [books, setBooks] = useState<PlainBookModel[]>([]);

  // Récupération des livres depuis l'API
  useEffect(() => {
    fetch('http://localhost:3001/books')
      .then((response) => response.json())
      .then((data) => {
        // const bookData = data;
        setBooks(data);
        setFilteredBooks(data);
        console.log(data)
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des livres :', error);
      });
  }, []);

  // Trier par ordre alphabétique le nom des livres
  const SortByAlpha = (): void => {
    const sortedBooks = [...filteredBooks];
    sortedBooks.sort((a, b) => {
      if (sortBy === 'asc') {
        return a.name.localeCompare(b.name);
      }
      return b.name.localeCompare(a.name);
    });
    setSortBy(sortBy === 'asc' ? 'desc' : 'asc');
    setFilteredBooks(sortedBooks);
  };

  // Trier par genres
  const SortByGenres = (): void => {
    const sortedBooks = [...filteredBooks];
    sortedBooks.sort((a, b) => {
      if (a && a.genres && a.genres.length > 0 && b && b.genres && b.genres.length > 0) {
        if (sortBy === 'asc') {
          return a.genres[0].localeCompare(b.genres[0]);
        } else {
          return b.genres[0].localeCompare(a.genres[0]);
        }
      }
      return 0; // Gérez le cas où l'un des objets est nul ou les tableaux "genres" sont vides.
    });
    setSortBy(sortBy === 'asc' ? 'desc' : 'asc');
    setFilteredBooks(sortedBooks);
  };

  // Recherche
  const Search = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const searchedTerm = event.target.value.toLowerCase();
    if (searchedTerm === '') {
      // Pas de recherche
      setFilteredBooks(books);
    } else {
      const filterBooks = books.filter((book) =>
        book.name.toLowerCase().includes(searchedTerm));
      setFilteredBooks(filterBooks);
    }
    setSearchTerm(searchedTerm);
  };

  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold">Bibliothèque</h1>
      <br />
      <input
        type="text"
        className="w-64 p-2 rounded border border-gray-300 focus:outline-none text-black"
        placeholder="Recherche par nom"
        value={searchTerm}
        onChange={Search}
      />
      <br />
      <br />
      <button
        type="button"
        className="bg-gray-700 text-white py-2 px-4 rounded-lg m-2 hover:opacity-70"
        onClick={SortByAlpha}
      >
        Trier par ordre alphabétique
      </button>
      <button
        type="button"
        className="bg-gray-700 text-white py-2 px-4 rounded-lg m-2 hover:opacity-70"
        onClick={SortByGenres}
      >
        Trier par genres
      </button>
      <br />
      <br />
      {filteredBooks.map((book) => (
        <div key={book.id} className="p-4">
          <a href={`books/${book.id}`}>
            <p className="text-lg font-semibold">
              Nom:
              <b>{book.name}</b>
            </p>
            <p>
              Genre:
              {book.genres}
            </p>
            <p>
              Autheur:
              {book.author.lastName}
              {book.author.firstName}
            </p>
            <p>
              Année de publication:
              {book.writtenOn}
            </p>
          </a>
        </div>
      ))}
    </div>
  );
};

export default BooksPage;
