import React from 'react';

const OutlineDesc: React.FC = props => {
  return (
    <p style={{ margin: 0, padding: 0, color: '#666666' }}>
      {props.children}
    </p>
  );
};

export default OutlineDesc;
