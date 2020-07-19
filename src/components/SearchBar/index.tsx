import { Icon, Input } from 'antd';
import React from 'react';

const SearchBar: React.FunctionComponent<{
  onSearch?: (s: string) => void;
}> = props => {
  const { onSearch } = props;
  return (
    <div>
      <Input
        style={{ width: '80%' }}
        prefix={<Icon type="search" />}
        onChange={e => onSearch && onSearch(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
