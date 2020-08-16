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
    case TaskStateType.accept:
      return (
        <p style={{ ...mainStyle, color: StateColor.Green }}>
          {stateDesc(state)}
        </p>
      );
    case TaskStateType.reject:
      return (
        <p style={{ ...mainStyle, color: StateColor.Yellow }}>
          {stateDesc(state)}
        </p>
      );
    case TaskStateType.resend:
      return (
        <p style={{ ...mainStyle, color: StateColor.Blue }}>
          {stateDesc(state)}
        </p>
      );
    case TaskStateType.drop:
      return (
        <p style={{ ...mainStyle, color: StateColor.Red }}>
          {stateDesc(state)}
        </p>
      );
    case TaskStateType.wait:
      return (
        <p style={{ ...mainStyle, color: StateColor.Blue }}>
          {stateDesc(state)}
        </p>
      );
    case TaskStateType.forward:
      return (
        <p style={{ ...mainStyle, color: StateColor.Blue }}>
          {stateDesc(state)}
        </p>
      );
    case TaskStateType.requested:
      return (
        <p style={{ ...mainStyle, color: StateColor.Blue }}>
          {stateDesc(state)}
        </p>
      );
  }
  return <div></div>;
};

export default State;
