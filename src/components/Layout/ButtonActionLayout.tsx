import { Col } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootReducersType } from 'Store/reducers';

const baseLayout: React.CSSProperties = {
  bottom: 50,
  position: 'fixed',
  width: '90%',
};

const staffLayout: React.CSSProperties = {
  bottom: 50,
  position: 'relative',
  width: '100%',
};

const ButtonActionLayout: React.FC = props => {
  const style = useSelector(
    (s: RootReducersType) => s.LayoutReducer.buttonActionLayout,
  );
  return (
    <Col span={24} style={style === 'base' ? baseLayout : staffLayout}>
      {props.children}
    </Col>
  );
};

export default ButtonActionLayout;
