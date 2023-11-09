import { FC, ReactElement } from 'react';

type ModalProps = {
  isOpen: boolean;
  onCancel: () => void;
  onSubmit?: () => void;
  title?: ReactElement | string;
  children: ReactElement;
};

export const Modal: FC<ModalProps> = ({
  isOpen,
  children,
  title,
  onSubmit,
  onCancel,
}) =>
  (isOpen ? (
    <div className="width-2/4 border-4 border-slate-600 shadow-slate-600 shadow rounded z-10 absolute min-h-fit top-1/3 left-1/4 bg-slate-500 flex flex-col">
      <div className="flex grow-0 flex-row-reverse justify-between items-center py-2 px-4">
        <button
          type="button"
          className="py-1 px-2 grow-0 text-2xl"
          onClick={onCancel}
        >
          x
        </button>
        {title ? <div className="grow">{title}</div> : undefined}
      </div>
      <hr className="opacity-20 mx-2" />
      <div className="py-2 px-4">{children}</div>
      <hr className="opacity-20 mx-2" />
      <div className="grow-0 w-full py-2 px-4 flex flex-row-reverse">
        {onSubmit ? (
          <button
            type="button"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mx-4"
            onClick={onSubmit}
          >
            Submit
          </button>
        ) : undefined}
        <button
          type="button"
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  ) : undefined);