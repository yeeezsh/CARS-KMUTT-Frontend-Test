import { StateColor } from 'Models/stateCard/colors.interface';
import React from 'react';
import stateDesc from 'Services/task/helpers/state.desc';
import { TaskStateType } from 'Services/task/task.interface';

const State: React.FC<{ state?: TaskStateType }> = props => {
  const mainStyle: React.CSSProperties = {
    fontWeight: 'bold',
  };
  const { state } = props;
  switch (state) {
    case 'accept':
      return (
        <p style={{ ...mainStyle, color: StateColor.Green }}>
          {stateDesc(state)}
        </p>
      );
    case 'reject':
      return (
        <p style={{ ...mainStyle, color: StateColor.Yellow }}>
          {stateDesc(state)}
        </p>
      );
    case 'drop':
      return (
        <p style={{ ...mainStyle, color: StateColor.Red }}>
          {stateDesc(state)}
        </p>
      );
    case 'wait':
      return (
        <p style={{ ...mainStyle, color: StateColor.Blue }}>
          {stateDesc(state)}
        </p>
      );
    case 'forward':
      return (
        <p style={{ ...mainStyle, color: StateColor.Blue }}>
          {stateDesc(state)}
        </p>
      );
    case 'requested':
      return (
        <p style={{ ...mainStyle, color: StateColor.Blue }}>
          {stateDesc(state)}
        </p>
      );
  }
  return <div></div>;
};

export default State;
