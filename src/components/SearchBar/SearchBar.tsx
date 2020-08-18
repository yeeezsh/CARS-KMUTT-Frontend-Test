import { Icon, Input } from 'antd';
import React from 'react';

const SearchBar: React.FunctionComponent<{
  onSearch?: (s: string) => void;
  loading: boolean;
}> = props => {
  const { onSearch, loading } = props;
  return (
    <div>
      <Input
        style={{ width: '80%' }}
        prefix={<Icon type={loading ? 'loading' : 'search'} />}
        onChange={e => onSearch && onSearch(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
