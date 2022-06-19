import React, { ChangeEvent } from 'react';
import { IoSearch } from 'react-icons/io5';
import classNames from 'classnames';

type Props = {
  value: string;
  placeholder?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
};

const SearchInput = (props: Props) => {
  const { value, onChange, placeholder, className } = props;

  return (
    <div className={classNames('w-full max-w-sm lg:max-w-xl', className)}>
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <div className="relative rounded-lg border text-gray-400 focus-within:text-gray-600">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <IoSearch className="h-5 w-5" aria-hidden="true" />
        </div>
        <input
          id="search"
          className="block w-full rounded-md border border-transparent bg-white py-2 pl-10 pr-3 leading-5 text-gray-900 placeholder-gray-500 focus:border-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-violet-600 focus:ring-offset-2 sm:text-sm"
          placeholder={placeholder}
          type="search"
          name="search"
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default SearchInput;
