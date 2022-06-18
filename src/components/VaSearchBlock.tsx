import React, { ChangeEvent, useCallback, useMemo, useState } from 'react';
import SearchInput from './SearchInput';
import { useQuery } from '@apollo/client';
import debounce from 'lodash/debounce';
import { vaSearchQuery } from '../graphql/search';
import { vaSearch, vaSearch_Page_staff, vaSearchVariables } from '../graphql/types/vaSearch';
import VaCard from './VaCard';

const VaSearchBlock = () => {
  const [searchValue, setSearchValue] = useState('');
  const [inputValue, setInputValue] = useState('');

  const { data } = useQuery<vaSearch, vaSearchVariables>(vaSearchQuery, {
    variables: {
      query: searchValue,
      perPage: 5,
    },
    skip: searchValue.length === 0,
  });

  const handleSearchChange = useMemo(
    () =>
      debounce((value: string) => {
        setSearchValue(value);
      }, 300),
    []
  );

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setInputValue(value);
      handleSearchChange(value);
    },
    [handleSearchChange]
  );

  const rows = useMemo(() => {
    return data?.Page?.staff?.filter((x): x is vaSearch_Page_staff => !!x) ?? [];
  }, [data]);

  return (
    <div className={'my-4 flex w-full cursor-pointer flex-col items-center'}>
      <SearchInput
        className={'my-4'}
        value={inputValue}
        onChange={handleChange}
        placeholder={'Find anime voice actors'}
      />
      <div className={'flex w-full flex-row items-start justify-center'}>
        {rows.map((staff) => (
          <VaCard className={'basis-1/5'} key={staff.id} staff={staff} />
        ))}
      </div>
    </div>
  );
};

export default VaSearchBlock;
