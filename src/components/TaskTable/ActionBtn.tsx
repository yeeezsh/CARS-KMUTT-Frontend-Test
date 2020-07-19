import EyeSVG from 'Assets/icons/staff/eye.svg';
import React, { useState } from 'react';

// styles
const baseStyle: React.CSSProperties = {
  border: '1px solid #FF682B',
  borderRadius: 4,
  background: '#ffffff',
  height: '100%',
  padding: 8,
  cursor: 'pointer',
  color: '#FF682B',
};

// div
const defaultStyle = baseStyle;
const onHoverStyle: React.CSSProperties = {
  ...baseStyle,
  ...{
    color: 'white',
    backgroundColor: '#FF682B',
  },
};

// svg
const defaultSVGStyle: React.CSSProperties = {
  float: 'left',
  padding: 4,
};
const onHoverSVGStyle: React.CSSProperties = {
  ...defaultSVGStyle,
  ...{ filter: 'brightness(0) invert(1)' },
};

const ActionBtn: React.FunctionComponent<{
  onClick?: () => void;
}> = props => {
  const [onHover, setOnHover] = useState(false);

  return (
    <div
      style={onHover === true ? onHoverStyle : defaultStyle}
      onMouseOver={() => setOnHover(true)}
      onMouseOut={() => setOnHover(false)}
      onClick={() => props.onClick && props.onClick()}
    >
      <span>
        <img
          style={onHover === true ? onHoverSVGStyle : defaultSVGStyle}
          src={EyeSVG}
        />
        <span>View</span>
      </span>
    </div>
  );
};

export default ActionBtn;
