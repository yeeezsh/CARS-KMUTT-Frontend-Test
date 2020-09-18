import { Col } from 'antd';
import React from 'react';

const ButtonActionLayout: React.FC = props => {
  return (
    <Col span={24} style={{ bottom: 50, position: 'fixed', width: '90%' }}>
      {props.children}
    </Col>
  );
};

export default ButtonActionLayout;
