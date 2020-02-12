import React from 'react';
import { Col, Row } from 'antd';

const BreakingLine: React.FunctionComponent<{
  lineSize?: number;
  color?: string;
}> = props => {
  const { lineSize, color } = props;
  return (
    <Row type="flex" justify="center">
      <Col span={22}>
        <div
          style={{
            border: `${lineSize || 1}px solid ${color || '#DADADA'}`,
            marginTop: '-4px',
          }}
        />
      </Col>
    </Row>
  );
};

export default BreakingLine;
