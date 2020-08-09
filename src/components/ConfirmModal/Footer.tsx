import { Col, Row } from 'antd';
import Button from 'Components/Button';
import template from 'Models/confirmModal/constant';
import { ConfirmMoalType } from 'Models/confirmModal/interface';
import React from 'react';

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
