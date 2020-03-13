import React from 'react';
import { Col, Row } from 'antd';

const HeadTitle: React.FC<{ title?: string; icon?: string }> = props => {
  const { title, icon } = props;
  return (
    <Col span={6}>
      <Row type="flex">
        <img src={icon} alt="head icon" />
        <p
          style={{
            marginLeft: '6px',
            marginTop: '18px',
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#FF682B',
          }}
        >
          {title}
        </p>
      </Row>
    </Col>
  );
};

export default HeadTitle;
