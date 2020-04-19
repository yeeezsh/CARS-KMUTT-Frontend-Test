import React from 'react';
import { Col, Row } from 'antd';

const BreakingLine: React.FunctionComponent<{
  lineSize?: number;
  color?: string;
  space?: number;
}> = props => {
  const { lineSize, color, space } = props;
  return (
    <Row type="flex" justify="center">
      <Col span={22}>
        <div
          style={{
            border: `${lineSize || 1}px solid ${color || '#DADADA'}`,
            margin: `${space || 6}px`,
          }}
        />
      </Col>
    </Row>
  );
};

export default BreakingLine;
