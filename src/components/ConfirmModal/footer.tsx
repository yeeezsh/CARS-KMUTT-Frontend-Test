import { Col, Row } from 'antd';
import Button from 'Components/Button';
import React from 'react';
import { ConfirmMoalType } from './interface';
import template from './template';

const ModalFooter: React.FC<{
  type: ConfirmMoalType;
  onBack: () => void;
  onAction: () => void;
}> = props => {
  const { type, onAction, onBack } = props;
  const templateSelected = template(type);

  return (
    <Row type="flex" justify="center">
      {/* big icon */}
      <Col span={7}>
        <Button
          onClick={onAction}
          style={{ backgroundColor: templateSelected?.btn.bg }}
        >
          {templateSelected?.btn.text}
        </Button>
      </Col>
      <Col span={1} /> {/* margin */}
      {/* back */}
      <Col span={7}>
        <Button
          onClick={onBack}
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
