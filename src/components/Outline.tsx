import React from 'react';

const style: React.CSSProperties = {
  color: '#FF682B',
  fontSize: '24px',
  lineHeight: '36px',
  fontWeight: 'bold',
};

const Outline: React.FunctionComponent<{ style?: React.CSSProperties }> = props => {
  return <p style={{ ...style, ...props.style }}>{props.children}</p>;
};
export default Outline;
