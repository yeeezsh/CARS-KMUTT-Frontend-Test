// Models
import stateDesc from 'Models/task/helpers/state.desc';
import React from 'react';
import StateBlue from '../../assets/icons/state.blue.svg';
import StateGreen from '../../assets/icons/state.green.svg';
import StateRed from '../../assets/icons/state.red.svg';
import { ReserveState } from '../../models/reserve/interface';

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
    case 'requested':
      return (
        <React.Fragment>
          <img src={StateBlue} alt="state-blue" />
          <p style={{ ...label, color: '#1890FF' }}>
            {desc || stateDesc(type)}
          </p>
        </React.Fragment>
      );
    case 'accept':
      return (
        <React.Fragment>
          <img src={StateGreen} alt="state-green" />
          <p style={{ ...label, color: '#52C41A' }}>
            {desc || stateDesc(type)}
          </p>
        </React.Fragment>
      );
    case 'reject':
      return (
        <React.Fragment>
          <img src={StateRed} alt="state-red" />
          <p style={{ ...label, color: '#F5222D' }}>
            {desc || stateDesc(type)}
          </p>
        </React.Fragment>
      );
    case 'drop':
      return (
        <React.Fragment>
          <img src={StateRed} alt="state-red" />
          <p style={{ ...label, color: '#F5222D' }}>
            {desc || stateDesc(type)}
          </p>
        </React.Fragment>
      );
    default:
      return null;
  }
};

export default StateCardIconColor;
