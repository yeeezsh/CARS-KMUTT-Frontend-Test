import React from 'react';
import Loadable from 'react-loadable';
import { ConfirmMoalType } from './interface';
import { Modal, Row, Col, Button, Input } from 'antd';
import ModalHeader from './header';
import ModalFooter from './footer';

const { TextArea } = Input;

const ConfirmModal: React.FC<{
  onClick?: () => void;
  header?: string;
  desc?: (msg: string) => void;
  type: ConfirmMoalType;
}> = props => {
  const { type } = props;
  const visibleState = true;

  function onBack() {
    console.log('on back clicked');
  }
  return (
    <Modal
      visible={visibleState}
      footer={null}
      closable={false}
      width={'60%'}
      bodyStyle={{
        padding: '35px 35px 35px 35px',
        minHeight: '400px',
        backgroundColor: '#FFFFFF',
        borderRadius: '4px',
      }}
    >
      {/* Header */}
      <Row type="flex" justify="center">
        <Col span={24}>
          <ModalHeader type={type} />
        </Col>

        {/* TextArea */}
        <Col span={18}>
          <TextArea
            placeholder="ข้อความถึงผู้ขอใช้บริการ"
            rows={4}
            style={{
              color: '#666666',
              backgroundColor: '#EDEDED',
              border: '1px solid #DADADA',
            }}
          />
        </Col>

        {/* Footer */}
        <Col style={{ marginTop: '12px' }} span={24}>
          <ModalFooter onBack={onBack} type={type} />
        </Col>
      </Row>
    </Modal>
  );
};

export default ConfirmModal;
