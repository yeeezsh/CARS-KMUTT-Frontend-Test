import React from 'react';

interface Style {
  type?: 'primary' | 'confirm' | 'disabled';
}

const btnStyle = (type?: Style['type']): React.CSSProperties => {
  const style: React.CSSProperties = {
    width: '100%',
    backgroundColor: '#FF682B',
    borderRadius: '100px',
    cursor: 'pointer',
    border: 'none',
  };

  switch (type) {
    case 'confirm':
      return {
        ...style,
        backgroundColor: '#1890FF',
      };
    case 'disabled':
      return {
        ...style,
        backgroundColor: '#979797',
      };
    default:
      return style;
  }
};

const Button: React.FunctionComponent<{
  color?: string;
  onClick?: any;
  type?: Style['type'];
  style?: React.CSSProperties;
  fontSize?: number;
  padding?: number;
  fontColor?: string;
}> = props => {
  const styles = {
    ...btnStyle(props.type),
    ...props.style,
  };
  const { fontSize, padding, fontColor } = props;

  return (
    <button type="submit" onClick={props.onClick} style={styles}>
      <p
        style={{
          color: fontColor || '#FFFFFF',
          fontSize: fontSize || '18px',
          lineHeight: '22px',
          fontWeight: 'bold',
          margin: 'auto',
          padding: padding || '9px',
        }}
      >
        {props.children}
      </p>
    </button>
  );
};

export default Button;
