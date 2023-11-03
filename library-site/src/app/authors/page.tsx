'use client';

import React, { FC, useEffect, useState } from 'react';
import { PlainAuthorModel } from '../../models/author.model';

const AuthorsPage: FC = () => {
  const [filteredAuthors, setFilteredAuthors] = useState<PlainAuthorModel[]>(
    [],
  );
  const [, setAuthors] = useState<PlainAuthorModel[]>([]);

  // Récupération des auteurs depuis l'API (pas encore implémenté du côté API)
  useEffect(() => {
    fetch('http://localhost:3001/authors')
      .then((response) => response.json())
      .then((data) => {
        // const AuthorData = data;
        setAuthors(data);
        setFilteredAuthors(data);
        // console.log(data)
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des auteurs :', error);
      });
  }, []);

  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold">Auteurs</h1>
      <br />
      <input
        type="text"
        className="w-64 p-2 rounded border border-gray-300 focus:outline-none text-black"
        placeholder="Recherche"
      />
      <br />
      <br />
      {/* ----- Implémentation de l'API Authors requise ----- */}
      {/* {filteredAuthors.map((authors) => (
        <div key={authors.id} className="p-4">
          <a href={`Authors/${authors.id}`}>
            <p>
              ID:
              {authors.id}
            </p>
            <p className="text-lg font-semibold">
              Prénom:
              <b>{authors.firstName}</b>
            </p>
            <p className="text-lg font-semibold">
              Nom de famille:
              <b>{authors.lastName}</b>
            </p>
            <p>
              Photo:
              {authors.photoUrl}
            </p>
          </a>
        </div>
      ))} */}
    </div>
  );
};

export default AuthorsPage;
