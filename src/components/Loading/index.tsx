import { Icon, Spin } from 'antd';
import React from 'react';

const Loading: React.FC<{
  size?: number;
  style?: React.CSSProperties;
}> = props => {
  const LoadingIcon = (
    <Icon type="loading" style={{ fontSize: props.size || 42 }} spin />
  );
  return (
    <div style={{ ...{ textAlign: 'center' }, ...props.style }}>
      <Spin indicator={LoadingIcon} />
    </div>
  );
};

export default Loading;
