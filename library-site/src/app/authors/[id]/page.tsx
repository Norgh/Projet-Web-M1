'use client';

import Image from 'next/image';
import { useParams } from 'next/navigation';
import React, { FC, useState } from 'react';
import { useGetAuthor } from '@/hooks';
import { UpdateAuthorModal } from '@/components/modal/authorModal';
import { UpdateAuthorInput } from '@/models';

const AuthorsDetailsPage: FC = () => {
  const { id } = useParams();
  const path = '/images/authors/';
  const { author, update } = useGetAuthor(id as string);
  const [isUpdateMode, setIsUpdateMode] = useState<boolean>(false);

  return (
    <div className="text-center">
      <button
        type="button"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-2xl"
        onClick={(): void => setIsUpdateMode(true)}
      >
        Modifier
        <span className="ml-2">+</span>
      </button>
      {author && (
        <p>
          {author.firstName}
          &nbsp;
          {author.lastName}
        </p>
      )}
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
      <UpdateAuthorModal
        isOpen={isUpdateMode}
        onClose={(): void => setIsUpdateMode(false)}
        author={author}
        setAuthor={(newAuthor: UpdateAuthorInput): void => update(newAuthor)}
      />
    </div>
  );
};

export default AuthorsDetailsPage;
