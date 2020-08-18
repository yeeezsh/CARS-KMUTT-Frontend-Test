import React from 'react';
import { useDispatch } from 'react-redux';
import { onSearch } from 'Store/reducers/search/actions';
import SearchBar from './SearchBar';

const SearchBarContainer: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <SearchBar
        onSearch={text => {
          dispatch(onSearch(text));
        }}
      />
    </div>
  );
};

export default SearchBarContainer;
