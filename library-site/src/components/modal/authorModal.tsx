import { ChangeEvent, FC, useState } from 'react';
import { Modal } from './Modal';
import { AddAuthorInput, PlainAuthorModel, UpdateAuthorInput } from '@/models';

type AddAuthorDetailsModalProps = {
  isOpen: boolean;
  SetAuthor: (book: AddAuthorInput) => void;
  onClose: () => void;
};

export const AddAuthorModal: FC<AddAuthorDetailsModalProps> = ({
  isOpen,
  SetAuthor,
  onClose,
}) => {
  const [newAuthor, setNewAuthor] = useState<AddAuthorInput>({
    firstName: 'Nom',
    lastName: 'Prénom',
    photoUrl: undefined,
  });

  const onCancel = (): void => {
    onClose();
  };

  /*
    Erreur non corrigeable : ESLint demande de passer à la ligne mais lorsque l'on passe à la ligne
    il nous demande de ne pas passer à la ligne après un =
  */
  // eslint-disable-next-line prettier/prettier
  const onChange = (property: keyof AddAuthorInput) => (e: ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();

      setNewAuthor({ ...newAuthor, [property]: e.target.value });
    };

  const onSubmit = (): void => {
    SetAuthor({
      firstName: newAuthor.firstName,
      lastName: newAuthor.lastName,
      photoUrl: newAuthor.photoUrl,
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
          <p className="text-lg">Nom</p>
          <input
            value={newAuthor.firstName}
            onChange={onChange('firstName')}
            className="w-full roundedw-64 p-2 rounded border border-gray-300 focus:outline-none text-black"
          />
        </div>
        <div className="w-1/4 m-4">
          <p className="text-lg">Prénom</p>
          <input
            value={newAuthor.lastName}
            onChange={onChange('lastName')}
            className="w-full roundedw-64 p-2 rounded border border-gray-300 focus:outline-none text-black"
          />
        </div>
      </div>
    </Modal>
  );
};

type UpdateAuthorDetailsModalProps = {
  isOpen: boolean;
  author: PlainAuthorModel | undefined;
  setAuthor: (newAuthor: UpdateAuthorInput) => void;
  onClose: () => void;
};

export const UpdateAuthorModal: FC<UpdateAuthorDetailsModalProps> = ({
  isOpen,
  author,
  setAuthor,
  onClose,
}) => {
  const [newAuthor, setNewAuthor] = useState<UpdateAuthorInput | undefined>(
    author,
  );

  const onCancel = (): void => {
    onClose();
  };

  /*
    Erreur non corrigeable : ESLint demande de passer à la ligne mais lorsque l'on passe à la ligne
    il nous demande de ne pas passer à la ligne après un =
  */
  // eslint-disable-next-line prettier/prettier
  const onChange = (property: keyof AddAuthorInput) => (e: ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();

      setNewAuthor({ ...newAuthor, [property]: e.target.value });
    };

  const onSubmit = (): void => {
    setAuthor({
      firstName: newAuthor?.firstName,
      lastName: newAuthor?.lastName,
      photoUrl: newAuthor?.photoUrl,
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
          <p className="text-lg">Nom</p>
          <input
            value={newAuthor?.firstName}
            onChange={onChange('firstName')}
            className="w-full roundedw-64 p-2 rounded border border-gray-300 focus:outline-none text-black"
          />
        </div>
        <div className="w-1/4 m-4">
          <p className="text-lg">Prénom</p>
          <input
            value={newAuthor?.lastName}
            onChange={onChange('lastName')}
            className="w-full roundedw-64 p-2 rounded border border-gray-300 focus:outline-none text-black"
          />
        </div>
      </div>
    </Modal>
  );
};
