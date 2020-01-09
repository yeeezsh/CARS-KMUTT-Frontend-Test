import React from 'react';

const style: React.CSSProperties = {
  color: '#FF682B',
  fontSize: '18px',
  lineHeight: '24px',
  fontWeight: 'normal',
  background: '#FDE3D4',
  borderRadius: '100px',
  padding: '5px 15px 5px 15px',
};

const Badge: React.FunctionComponent = props => {
  return <p style={style}>{props.children}</p>;
};
export default Badge;
