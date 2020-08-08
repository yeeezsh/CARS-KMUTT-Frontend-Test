import React from 'react';
import stateDesc from 'Services/task/helpers/state.desc';

const State: React.FC<{ state?: string }> = props => {
  const mainStyle: React.CSSProperties = {
    fontWeight: 'bold',
  };
  const { state } = props;
  switch (state) {
    case 'accept':
      return (
        <p style={{ ...mainStyle, color: '#52C41A' }}>
          {stateDesc(state)}
        </p>
      );
    case 'reject':
      return (
        <p style={{ ...mainStyle, color: '#F5222D' }}>
          {stateDesc(state)}
        </p>
      );
    case 'drop':
      return (
        <p style={{ ...mainStyle, color: '#F5222D' }}>
          {stateDesc(state)}
        </p>
      );
    case 'wait':
      return (
        <p style={{ ...mainStyle, color: '#1890FF' }}>
          {stateDesc(state)}
        </p>
      );
    case 'forward':
      return (
        <p style={{ ...mainStyle, color: '#1890FF' }}>
          {stateDesc(state)}
        </p>
      );
    case 'requested':
      return (
        <p style={{ ...mainStyle, color: '#1890FF' }}>
          {stateDesc(state)}
        </p>
      );
  }
  return <div></div>;
};

export default State;
