import React from 'react';
import { Row } from 'antd';

const DEFAULT_HEIGHT = 125;
const Trail: React.FC<{ size?: number }> = props => {
  return (
    <Row
      style={{
        height: props.size + 'px' || DEFAULT_HEIGHT,
      }}
    />
  );
};

export default Trail;
