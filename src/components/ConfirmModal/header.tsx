import { Col, Row } from 'antd';
import template from 'Models/confirmModal/constant';
import { ConfirmMoalType } from 'Models/confirmModal/interface';
import React from 'react';

const ModalHeader: React.FC<{ type: ConfirmMoalType }> = props => {
  const { type } = props;
  const templateSelected = template(type);

  return (
    <Row type="flex" justify="center">
      {/* big icon */}
      {templateSelected?.icon && (
        <Col>
          <img src={templateSelected?.icon} alt="icon-header" />
        </Col>
      )}

      <Col span={24}>
        <h1
          style={{
            marginTop: '12px',
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: '22px',
          }}
        >
          {templateSelected?.header}
        </h1>
      </Col>
    </Row>
  );
};

export default ModalHeader;
