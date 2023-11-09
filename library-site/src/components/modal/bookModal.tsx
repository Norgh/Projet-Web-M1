import { ChangeEvent, FC, useState } from 'react';
import { Modal } from './Modal';
import { AddBookInput } from '@/models';
import { useListGenres } from '@/hooks/providers/genreProviders';

type UserDetailsModalProps = {
  isOpen: boolean;
  SetBook: (book: AddBookInput) => void;
  onClose: () => void;
};

export const AddBookModal: FC<UserDetailsModalProps> = ({
  isOpen,
  SetBook,
  onClose,
}) => {
  const { genres } = useListGenres();

  const [newBook, setNewBook] = useState<AddBookInput>({
    name: 'Titre',
    writtenOn: '1999',
    authorId: '1',
    genresId: [genres[0]?.id],
  });
  const [selectedGenres, setSelectedGenres] = useState<string[]>([
    genres[0]?.id,
  ]);

  const onCancel = (): void => {
    onClose();
  };

  const onSelectGenres = (e: ChangeEvent<HTMLSelectElement>): void => {
    e.preventDefault();

    setSelectedGenres([...selectedGenres, e.target.value]);
  };

  const onChange =
    (property: keyof AddBookInput) => (e: ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();

      setNewBook({ ...newBook, [property]: e.target.value });
    };

  const onSubmit = (): void => {
    SetBook({
      name: newBook.name,
      writtenOn: newBook.writtenOn,
      authorId: newBook.authorId,
      genresId: selectedGenres,
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onCancel={onCancel}
      onSubmit={onSubmit}
      title="Ajout d'un livre"
    >
      <div className="width-full flex justify-between py-4">
        <div className="w-1/4 m-4">
          <p className="text-lg">Titre</p>
          <input
            value={newBook.name}
            onChange={onChange('name')}
            className="w-full roundedw-64 p-2 rounded border border-gray-300 focus:outline-none text-black"
          />
        </div>
        <div className="w-1/4 m-4">
          <p className="text-lg">Date</p>
          <input
            value={newBook.writtenOn}
            onChange={onChange('writtenOn')}
            className="w-full roundedw-64 p-2 rounded border border-gray-300 focus:outline-none text-black"
          />
        </div>
        <div className="w-1/4 m-4">
          <p className="text-lg">Genre</p>
          <select
            onChange={onSelectGenres}
            className="w-full text-black p-2 roundedw-64 rounded border border-gray-300 focus:outline-none text-black"
          >
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
          <div>
            {selectedGenres.map((selectedGenre) => (
              <p>{genres.find((genre) => genre.id === selectedGenre)?.name}</p>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};
