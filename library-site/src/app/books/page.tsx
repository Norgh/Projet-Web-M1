'use client';

import React, { FC, ReactElement, useEffect, useState } from 'react';
import { PlainBookModel } from '../../models/book.model';

const BooksPage: FC = () => {
  const [sortBy, setSortBy] = useState<'asc' | 'desc'>('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBooks, setFilteredBooks] = useState<PlainBookModel[]>([]);
  const [books, setBooks] = useState<PlainBookModel[]>([]);

  //Récupération des livres depuis l'API
  useEffect(() => {
    fetch('http://localhost:3001/books')
      .then((response) => response.json())
      .then((data) => {
        const bookData = data;
        setBooks(data);
        setFilteredBooks(data);
        console.log(data)
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des livres :', error);
      });
  }, []);

  //Trier par ordre alphabètique
  const SortByAlpha = () => {
    const sortedBooks = [...filteredBooks];
    sortedBooks.sort((a, b) => (sortBy === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)));
    setSortBy(sortBy === 'asc' ? 'desc' : 'asc');
    setFilteredBooks(sortedBooks);
  };

  //Trier par genres (pour l'instant c'est par ID parce qu'on n'a pas de genre)
  const SortByGenres = () => {
    const sortedBooks = [...filteredBooks];
    sortedBooks.sort((a, b) => (sortBy === 'asc' ? a.id.localeCompare(b.id) : b.id.localeCompare(a.id)));
    setSortBy(sortBy === 'asc' ? 'desc' : 'asc');
    setFilteredBooks(sortedBooks);
  };

  //Recherche
  const Search = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value.toLowerCase();
    if (searchTerm === '') { //Pas de recherche
      setFilteredBooks(books);
    } else {
      const filteredBooks = books.filter((book) =>
        book.name.toLowerCase().includes(searchTerm)
      );
      setFilteredBooks(filteredBooks);
    }
    setSearchTerm(searchTerm);
  };

  return (
    <>
      <div className="text-center">
        <h1 className="text-2xl font-bold">Bibliothèque</h1>
        <br/>
        <input type="text" className="w-64 p-2 rounded border border-gray-300 focus:outline-none text-black" placeholder="Recherche par nom" value={searchTerm} onChange={Search}/>
        <br/><br/>
        <button className="bg-gray-700 text-white py-2 px-4 rounded-lg m-2 hover:opacity-70" onClick={SortByAlpha}>Trier par ordre alphabétique</button>
        <button className="bg-gray-700 text-white py-2 px-4 rounded-lg m-2 hover:opacity-70" onClick={SortByGenres}>Trier par genres (mais pour l'instant c'est par ID)</button>
        <br/><br/>
        {filteredBooks.map((book) => (
          <div key={book.id} className="p-4">
            <a href={'books/' + book.id}>
              <p className="text-lg font-semibold">Nom: <b>{book.name}</b></p>
              <p>ID: {book.id}</p>
              <p>Année de publication: {book.writtenOn}</p>
            </a>
          </div>
        ))}
      </div>
    </>
  );
};

export default BooksPage;