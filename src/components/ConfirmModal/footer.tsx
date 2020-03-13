import React from 'react';
import { ConfirmMoalType } from './interface';

import { Row, Col } from 'antd';
import template from './template';
import Button from 'Components/Button';

const ModalFooter: React.FC<{
  type: ConfirmMoalType;
  onBack: () => void;
}> = props => {
  const { type } = props;
  const templateSelected = template(type);

  return (
    <Row type="flex" justify="center">
      {/* big icon */}
      <Col span={7}>
        <Button style={{ backgroundColor: templateSelected?.btn.bg }}>
          {templateSelected?.btn.text}
        </Button>
      </Col>
      <Col span={1} /> {/* margin */}
      <Col span={7}>
        <Button
          fontColor="#979797"
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #979797',
          }}
        >
          ย้อนกลับ
        </Button>
      </Col>
    </Row>
  );
};

export default ModalFooter;
