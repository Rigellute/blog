import React from 'react';

type Props = {
  canShow?: boolean;
  message: string;
};

export const Success = ({ canShow, message }: Props) => {
  return (
    <div className={`${canShow ? '' : 'hidden'} p-4 rounded-md bg-green-50`}>
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <svg
            className="w-5 h-5 text-green-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="ml-3">
          <span className="text-sm font-medium text-green-800 leading-5">
            {message}
          </span>
        </div>
      </div>
    </div>
  );
};

export const Error = ({ canShow, message }: Props) => {
  return (
    <div className={`${canShow ? '' : 'hidden'} rounded-md bg-red-50 p-4`}>
      <div className="flex">
        <div className="flex-shrink-0">
          <svg
            className="w-5 h-5 text-red-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="ml-3">
          <div className="text-sm font-medium text-red-800 leading-5">Oops</div>
          <div className="mt-2 text-sm leading-5 text-red-700">{message}</div>
        </div>
      </div>
    </div>
  );
};
