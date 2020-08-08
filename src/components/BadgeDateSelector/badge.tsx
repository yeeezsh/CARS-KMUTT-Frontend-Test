import blueCheckedIcon from 'Assets/icons/checked.blue.svg';
import React from 'react';

const styles = (active: boolean): React.CSSProperties => {
  return {
    position: 'absolute',
    marginLeft: '55px',
    width: '20px',
    visibility: active ? 'visible' : 'hidden',
  };
};

const Badge: React.FunctionComponent<{ active: boolean }> = props => {
  return (
    <React.Fragment>
      <img
        src={blueCheckedIcon}
        alt="blue-checked"
        style={styles(props.active)}
      />
      {props.children}
    </React.Fragment>
  );
};

export default Badge;
