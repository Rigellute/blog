import React from 'react';
// @ts-ignore
import CrossIcon from '../images/menu-cross.inline.svg';

export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) => {
  const style = isOpen ? 'modal-active' : 'opacity-0 pointer-events-none';
  return (
    <div
      className={`modal ${style} fixed w-full h-full top-0 left-0 flex items-center justify-center z-50`}
    >
      <div
        onClick={onClose}
        className="absolute w-full h-full bg-gray-900 opacity-50"
      ></div>

      <div className="bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50">
        <div className="py-4 text-left px-6">
          <div className="flex justify-between items-center pb-3">
            <span className="text-2xl font-bold">{title}</span>
            <div className="cursor-pointer z-50">
              <CrossIcon
                className="fill-current text-black w-4 h-4"
                onClick={onClose}
              />
            </div>
          </div>

          <div className="modal-body">{children}</div>
        </div>
      </div>
    </div>
  );
};
