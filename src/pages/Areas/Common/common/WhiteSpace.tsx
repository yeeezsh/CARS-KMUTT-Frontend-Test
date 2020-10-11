import React from 'react';

const DEFAULT_HEIGHT = '125px';
const WhiteSpace: React.FC<{ size?: number }> = props => {
  return (
    <div
      style={{
        height: props.size ? props.size + 'px' : DEFAULT_HEIGHT,
      }}
    />
  );
};

export default WhiteSpace;
