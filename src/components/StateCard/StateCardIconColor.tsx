import { StateColor } from 'Models/stateCard/colors.interface';
import { StateBlue, StateGreen, StateRed } from 'Models/stateCard/icon';
import React from 'react';
import { ReserveState } from 'Services/reserve/interface';
import stateDesc from 'Services/task/helpers/state.desc';

const StateCardIconColor: React.FunctionComponent<{
  type: ReserveState;
  desc?: string;
  style?: React.CSSProperties;
}> = props => {
  const { type, desc, style } = props;
  const label: React.CSSProperties = {
    marginLeft: '18px',
    marginTop: '-16px',
    ...style,
  };
  switch (type) {
    case 'wait':
      return (
        <React.Fragment>
          <img src={StateBlue} alt="state-blue" />
          <p style={{ ...label, color: '#1890FF' }}>
            {desc || stateDesc(type)}
          </p>
        </React.Fragment>
      );
    case 'forward':
      return (
        <React.Fragment>
          <img src={StateBlue} alt="state-blue" />
          <p style={{ ...label, color: StateColor.Blue }}>
            {desc || stateDesc(type)}
          </p>
        </React.Fragment>
      );
    case 'requested':
      return (
        <React.Fragment>
          <img src={StateBlue} alt="state-blue" />
          <p style={{ ...label, color: StateColor.Blue }}>
            {desc || stateDesc(type)}
          </p>
        </React.Fragment>
      );
    case 'accept':
      return (
        <React.Fragment>
          <img src={StateGreen} alt="state-green" />
          <p style={{ ...label, color: StateColor.Green }}>
            {desc || stateDesc(type)}
          </p>
        </React.Fragment>
      );
    case 'reject':
      return (
        <React.Fragment>
          <img src={StateRed} alt="state-red" />
          <p style={{ ...label, color: StateColor.Red }}>
            {desc || stateDesc(type)}
          </p>
        </React.Fragment>
      );
    case 'drop':
      return (
        <React.Fragment>
          <img src={StateRed} alt="state-red" />
          <p style={{ ...label, color: StateColor.Red }}>
            {desc || stateDesc(type)}
          </p>
        </React.Fragment>
      );
    default:
      return null;
  }
};

export default StateCardIconColor;
