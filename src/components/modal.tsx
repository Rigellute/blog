import React from 'react';
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

      <div className="z-50 w-11/12 mx-auto bg-white rounded shadow-lg md:max-w-md">
        <div className="px-6 py-4 text-left">
          <div className="flex items-center justify-between pb-3">
            <span className="text-2xl font-bold">{title}</span>
            <div className="z-50 cursor-pointer">
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
