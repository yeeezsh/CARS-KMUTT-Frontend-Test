import { Col } from 'antd';
import useWindowResize from 'Hooks/use.windows.resize';
import React from 'react';

const OverviewBorderLayout: React.FC<{
  viewOnly?: boolean; // view hide border
  style?: React.CSSProperties;
  color?: React.CSSProperties['color'];
  expandOffset?: number;
  marginTop?: number;
}> = props => {
  const { viewOnly, children } = props;
  const { height } = useWindowResize();
  const offset = viewOnly === true ? height : props.expandOffset || 200;
  const color = props.color || '#1890FF';
  const marginTop = props.marginTop || -32;
  const style: React.CSSProperties = {
    border: viewOnly ? '' : `1px solid ${color}`,
    padding: 24,
    margin: 0,
    marginTop,
  };
  return (
    <Col span={24} style={style}>
      {children}
      <div style={{ height: Math.abs(height - offset) }} />
    </Col>
  );
};

export default OverviewBorderLayout;
