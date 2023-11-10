import { ChangeEvent, FC, useState } from 'react';
import { Modal } from './Modal';
import { AddBookInput, PlainBookModel, UpdateBookInput } from '@/models';
import { useListGenres } from '@/hooks/providers/genreProviders';
import { useListAuthors } from '@/hooks';

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
  const { authors } = useListAuthors();

  const [newBook, setNewBook] = useState<AddBookInput>({
    name: 'Titre',
    writtenOn: '1999',
    authorId: authors[0]?.id,
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

  /*
    Erreur non corrigeable : ESLint demande de passer à la ligne mais lorsque l'on passe à la ligne
    il nous demande de ne pas passer à la ligne
  */
  const onChange =
    (property: keyof AddBookInput) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
          <p className="text-lg">Auteur</p>
          <select
            onChange={onChange('authorId')}
            className="w-full text-black p-2 roundedw-64 rounded border border-gray-300 focus:outline-none text-black"
          >
            {authors.map((author) => (
              <option key={author.id} value={author.id}>
                {author.firstName}
                &nbsp;
                {author.lastName}
              </option>
            ))}
          </select>
          <div>
            {selectedGenres.map((selectedGenre) => (
              <p>{genres.find((genre) => genre.id === selectedGenre)?.name}</p>
            ))}
          </div>
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

type UpdateBookDetailsModalProps = {
  isOpen: boolean;
  book: PlainBookModel | undefined;
  updateBook: (newBook: UpdateBookInput) => void;
  onClose: () => void;
};

export const UpdateBookModal: FC<UpdateBookDetailsModalProps> = ({
  isOpen,
  book,
  updateBook,
  onClose,
}) => {
  const { genres } = useListGenres();
  const { authors } = useListAuthors();
  const [newBook, setNewBook] = useState<UpdateBookInput | undefined>(book);
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

  /*
    Erreur non corrigeable : ESLint demande de passer à la ligne mais lorsque l'on passe à la ligne
    il nous demande de ne pas passer à la ligne après un =
  */
  // eslint-disable-next-line prettier/prettier
  const onChange = (property: keyof UpdateBookInput) => (e: ChangeEvent<
    HTMLInputElement | HTMLSelectElement
    >) => {
      e.preventDefault();

      setNewBook({ ...newBook, [property]: e.target.value });
    };

  const onSubmit = (): void => {
    updateBook({
      name: newBook?.name,
      writtenOn: newBook?.writtenOn,
      authorId: newBook?.authorId,
      genresId: selectedGenres,
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onCancel={onCancel}
      onSubmit={onSubmit}
      title="Modification d'un livre"
    >
      <div className="width-full flex justify-between py-4">
        <div className="w-1/4 m-4">
          <p className="text-lg">Titre</p>
          <input
            value={newBook?.name}
            onChange={onChange('name')}
            className="w-full roundedw-64 p-2 rounded border border-gray-300 focus:outline-none text-black"
          />
        </div>
        <div className="w-1/4 m-4">
          <p className="text-lg">Date</p>
          <input
            value={newBook?.writtenOn}
            onChange={onChange('writtenOn')}
            className="w-full roundedw-64 p-2 rounded border border-gray-300 focus:outline-none text-black"
          />
        </div>
        <div className="w-1/4 m-4">
          <p className="text-lg">Auteur</p>
          <select
            onChange={onChange('authorId')}
            className="w-full text-black p-2 roundedw-64 rounded border border-gray-300 focus:outline-none text-black"
          >
            {authors.map((author) => (
              <option key={author.id} value={author.id}>
                {author.firstName}
                &nbsp;
                {author.lastName}
              </option>
            ))}
          </select>
          <div>
            {selectedGenres.map((selectedGenre) => (
              <p>{genres.find((genre) => genre.id === selectedGenre)?.name}</p>
            ))}
          </div>
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

type DeleteBookModalDetailsModalProps = {
  isOpen: boolean;
  deleteBook: () => void;
  onClose: () => void;
};

export const DeleteBookModal: FC<DeleteBookModalDetailsModalProps> = ({
  isOpen,
  deleteBook,
  onClose,
}) => {
  const onCancel = (): void => {
    onClose();
  };

  const onSubmit = (): void => {
    deleteBook();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onCancel={onCancel}
      onSubmit={onSubmit}
      title="Suppression d'un livre"
    >
      <div className="width-full flex justify-between py-4">
        <p>Voulez-vous vraiment supprimer cet auteur ?</p>
      </div>
    </Modal>
  );
};
