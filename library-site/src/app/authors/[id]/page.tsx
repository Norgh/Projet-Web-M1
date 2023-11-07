'use client';

import Image from 'next/image';
import { useParams } from 'next/navigation';
import React, { FC, useEffect, useState } from 'react';
import { PlainAuthorModel } from '../../../models/author.model';

const AuthorsDetailsPage: FC = () => {
  const { id } = useParams();
  const [authors, setAuthors] = useState<PlainAuthorModel>();
  const path = '/images/authors/';
  // Récupération des auteurs depuis l'API
  useEffect(() => {
    fetch(`http://localhost:3001/authors/${id}`)
      .then((response) => response.json())
      .then((data) => {
        // const authorData = data;
        setAuthors(data);
        console.log(data);
      });
  }, [id]);

  return (
    <div className="text-center">
      {authors && (
        <p>
          {authors.firstName}
          &nbsp;
          {authors.lastName}
        </p>
      )}
      {authors?.photoUrl && (
        <p>
          <Image
            src={path + authors.photoUrl}
            alt={`${authors.firstName} ${authors.lastName}`}
            width={250}
            height={250}
          />
        </p>
      )}
    </div>
  );
};

export default AuthorsDetailsPage;
