import React from 'react';
import { Col, Row } from 'antd';

const BreakingLine: React.FunctionComponent<{ lineSize?: number }> = props => {
  return (
    <Row type="flex" justify="center">
      <Col span={22}>
        <div
          style={{
            border: `${props.lineSize || 1}px solid #DADADA`,
            marginTop: '-4px',
          }}
        />
      </Col>
    </Row>
  );
};

export default BreakingLine;
