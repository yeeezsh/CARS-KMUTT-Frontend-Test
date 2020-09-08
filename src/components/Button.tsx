import { ButtonBackgroundColor } from 'Models/button/button.bg';
import { ActionButtonStyle } from 'Models/button/button.interface';
import React from 'react';

const btnStyle = (
  type?: ActionButtonStyle['type'],
): React.CSSProperties => {
  const style: React.CSSProperties = {
    width: '100%',
    backgroundColor: ButtonBackgroundColor.Orange,
    borderRadius: '100px',
    cursor: 'pointer',
    border: 'none',
  };

  switch (type) {
    case 'confirm':
      return {
        ...style,
        backgroundColor: ButtonBackgroundColor.Blue,
      };
    case 'disabled':
      return {
        ...style,
        backgroundColor: ButtonBackgroundColor.Grey,
      };
    default:
      return style;
  }
};

const Button: React.FunctionComponent<{
  color?: string;
  onClick?: () => void;
  type?: ActionButtonStyle['type'];
  style?: React.CSSProperties;
  fontSize?: number;
  padding?: string | number;
  fontColor?: string;
  margin?: string;
}> = props => {
  const styles = {
    ...btnStyle(props.type),
    ...props.style,
  };
  const { fontSize, padding, fontColor, onClick, margin } = props;

  return (
    <button type="submit" onClick={onClick} style={styles}>
      <p
        style={{
          color: fontColor || ButtonBackgroundColor.White,
          fontSize: fontSize || '18px',
          lineHeight: '22px',
          fontWeight: 'bold',
          margin: margin || 'auto',
          padding: padding || '9px',
        }}
      >
        {props.children}
      </p>
    </button>
  );
};

export default Button;
