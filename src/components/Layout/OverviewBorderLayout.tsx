import { Col } from 'antd';
import useWindowResize from 'Hooks/use.windows.resize';
import React from 'react';

const OverviewBorderLayout: React.FC<{
  viewOnly?: boolean; // view hide border
  style?: React.CSSProperties;
  color?: React.CSSProperties['color'];
  offset?: number;
}> = props => {
  const { viewOnly, children } = props;
  const { height } = useWindowResize();
  const offset = props.offset || 200;
  const color = props.color || '#1890FF';

  const style: React.CSSProperties = {
    border: viewOnly ? '' : `1px solid ${color}`,
    padding: 24,
    marginTop: -32,
  };
  return (
    <Col span={24} style={style}>
      {children}
      <div style={{ height: Math.abs(height - offset) }} />
    </Col>
  );
};

export default OverviewBorderLayout;
