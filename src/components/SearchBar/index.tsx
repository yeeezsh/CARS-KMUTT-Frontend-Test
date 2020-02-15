import React from 'react';
import { Input, Icon } from 'antd';

const SearchBar: React.FunctionComponent<{
  onSearch?: (s: string) => void;
}> = props => {
  const { onSearch } = props;
  return (
    <div>
      <Input
        style={{ width: '40%' }}
        prefix={<Icon type="search" />}
        onChange={e => onSearch && onSearch(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
