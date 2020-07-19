import { Icon, Spin } from 'antd';
import React from 'react';

const LoadingIcon = <Icon type="loading" style={{ fontSize: 42 }} spin />;

const Loading: React.FC = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <Spin indicator={LoadingIcon} />
    </div>
  );
};

export default Loading;
