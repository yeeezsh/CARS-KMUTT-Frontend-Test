import React from 'react';
import { Col } from 'antd';
import BreakingLine from 'Components/BreakingLine';

export const CustomBrakeLine: React.FC = () => (
  <Col style={{ margin: '24px 0px 12px 0px' }} span={24}>
    <BreakingLine lineSize={0.25} />
  </Col>
);

export const mainStyle: React.CSSProperties = {
  borderRadius: 4,
  padding: '12px 24px 12px 24px',
  color: '#FFFFFF',
  fontSize: '18px',
  fontWeight: 'bold',
  background: '#FF682B',
  boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.15)',
};

export const detailStyle: React.CSSProperties = {
  fontWeight: 'normal',
};
