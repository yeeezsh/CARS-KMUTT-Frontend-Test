import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootReducersType } from 'Store/reducers';
import { onQuery, onSearch } from 'Store/reducers/search/actions';
import SearchBar from './SearchBar';

const SearchBarContainer: React.FC = () => {
  const state = useSelector((s: RootReducersType) => s.SearchReducers);

  const dispatch = useDispatch();

  return (
    <div>
      <SearchBar
        loading={state.loading}
        onSearch={text => {
          dispatch(onSearch(text));
          dispatch(onQuery({ s: text }));
        }}
      />
    </div>
  );
};

export default SearchBarContainer;
