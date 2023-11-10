'use client';

import Image from 'next/image';
import { useParams } from 'next/navigation';
import React, { FC, useState } from 'react';
import { useGetAuthor } from '@/hooks';
import {
  DeleteAuthorModal,
  UpdateAuthorModal,
} from '@/components/modal/authorModal';
import { UpdateAuthorInput } from '@/models';

const AuthorsDetailsPage: FC = () => {
  const { id } = useParams();
  const path = '/images/authors/';
  const { author, update, deleteAuthor } = useGetAuthor(id as string);
  const [isUpdateMode, setIsUpdateMode] = useState<boolean>(false);
  const [isDeleteMode, setIsDeleteMode] = useState<boolean>(false);
  return (
    <div className="text-center">
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
      {author && (
        <h2>
          {author.firstName}
          &nbsp;
          {author.lastName}
        </h2>
      )}
      <div className="flex">
        {author?.photoUrl && (
          <div>
            <Image
              src={path + author.photoUrl}
              alt={`${author.firstName} ${author.lastName}`}
              width={250}
              height={250}
            />
          </div>
        )}
        {author?.books?.map((book) => (
          <a href={`../books/${book.id}`}>{book.name}</a>
        ))}
      </div>
      <UpdateAuthorModal
        isOpen={isUpdateMode}
        onClose={(): void => setIsUpdateMode(false)}
        author={author}
        updateAuthor={(newAuthor: UpdateAuthorInput): void => update(newAuthor)}
      />
      <DeleteAuthorModal
        isOpen={isDeleteMode}
        onClose={(): void => setIsDeleteMode(false)}
        deleteAuthor={(): void => deleteAuthor()}
      />
    </div>
  );
};

export default AuthorsDetailsPage;
