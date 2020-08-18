import React from 'react';
import AutoComplete from './AutoComplete';
import SearchBar from './SearchBar';

const SearchBarContainer: React.FC = () => {
  return (
    <div>
      <SearchBar />
      <AutoComplete data={{ data: [], count: 0 }} />
    </div>
  );
};

export default SearchBarContainer;
