import React, { ChangeEvent, useCallback, useMemo, useState } from 'react';
import SearchInput from './SearchInput';
import { useQuery } from '@apollo/client';
import debounce from 'lodash/debounce';
import { studioSearchQuery } from '../graphql/search';
import StudioCard from './StudioCard';
import { studioSearch, studioSearch_Page_studios, studioSearchVariables } from '../graphql/types/studioSearch';

type Props = {};

const StudioSearchBlock = (props: Props) => {
  const [searchValue, setSearchValue] = useState('');
  const [inputValue, setInputValue] = useState('');

  const { data, loading } = useQuery<studioSearch, studioSearchVariables>(studioSearchQuery, {
    variables: {
      query: searchValue,
      perPage: 4,
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

  const results = useMemo(() => {
    return data?.Page?.studios?.filter((x): x is studioSearch_Page_studios => !!x) ?? [];
  }, [data]);

  const noResults = results.length === 0 && !loading && searchValue.length > 0;
  const showPlaceholder = searchValue.length === 0;

  return (
    <div className={'my-4 flex w-full flex-col items-center'}>
      <SearchInput className={'my-4'} value={inputValue} onChange={handleChange} placeholder={'Find anime studios'} />
      <div className={'flex w-full flex-row items-center justify-center'}>
        {results.map((studio) => (
          <StudioCard className={'basis-1/4'} key={studio.id} id={studio.id} name={studio.name} />
        ))}
        {showPlaceholder && (
          <>
            <StudioCard className={'basis-1/4'} id={43} name={'ufotable'} />
            <StudioCard className={'basis-1/4'} id={2} name={'Kyoto Animation'} />
          </>
        )}
        {noResults && <div>No Studios found</div>}
      </div>
    </div>
  );
};

export default StudioSearchBlock;
