import React, { ChangeEvent, useCallback, useMemo, useState } from 'react';
import SearchInput from './SearchInput';
import { useQuery } from '@apollo/client';
import debounce from 'lodash/debounce';
import { staffSearchQuery } from '../graphql/search';
import { staffSearch, staffSearch_Page_staff, staffSearchVariables } from '../graphql/types/staffSearch';
import StaffCard from './StaffCard';

type Props = {};

const StaffSearchBlock = (props: Props) => {
  const [searchValue, setSearchValue] = useState('');
  const [inputValue, setInputValue] = useState('');

  const { data } = useQuery<staffSearch, staffSearchVariables>(staffSearchQuery, {
    variables: {
      query: searchValue,
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
    return data?.Page?.staff?.filter((x): x is staffSearch_Page_staff => !!x) ?? [];
  }, [data]);

  return (
    <div className={'my-4 flex w-full cursor-pointer flex-col items-center'}>
      <SearchInput
        className={'my-4'}
        value={inputValue}
        onChange={handleChange}
        placeholder={'Find anime and manga staff'}
      />
      <div className={'flex w-full flex-row items-start justify-center'}>
        {rows.map((staff) => (
          <StaffCard className={'basis-1/4'} key={staff.id} staff={staff} />
        ))}
      </div>
    </div>
  );
};

export default StaffSearchBlock;
