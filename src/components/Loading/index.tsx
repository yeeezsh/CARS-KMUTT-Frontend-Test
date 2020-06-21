import React from 'react';
import { Icon, Spin } from 'antd';

const LoadingIcon = <Icon type="loading" style={{ fontSize: 42 }} spin />;

const Loading: React.FC = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <Spin indicator={LoadingIcon} />
    </div>
  );
};

export default Loading;
