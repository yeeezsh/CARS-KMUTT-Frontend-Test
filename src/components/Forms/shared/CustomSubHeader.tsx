import Outline from 'Components/Outline';
import React from 'react';

const CustomSubHeader: React.FC = props => (
  <Outline style={{ color: '#1890FF', fontSize: '14px', margin: 0 }}>
    {props.children}
  </Outline>
);

export default CustomSubHeader;
