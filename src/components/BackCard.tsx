import React from 'react';

const styles: React.CSSProperties = {
  fontSize: '12px',
  color: '#FF682B',
  fontWeight: 'normal',
  lineHeight: '22px',
  cursor: 'pointer',
  display: 'block',
};

const BackCard: React.FunctionComponent<{
  onClick?: any;
  styles?: React.CSSProperties;
}> = props => {
  const { onClick } = props;
  return (
    <div
      onClick={() => onClick && onClick()}
      style={{ ...styles, ...props.styles }}
    >
      {'< '}
      {props.children}
    </div>
  );
};

export default BackCard;
