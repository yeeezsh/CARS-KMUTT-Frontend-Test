import Loadable from '@loadable/component';
import { Col, Input, Modal, Row } from 'antd';
import { ConfirmMoalType } from 'Models/confirmModal/interface';
import React, { useEffect, useState } from 'react';

const ModalHeader = Loadable(() => import('./Header'));
const ModalFooter = Loadable(() => import('./Footer'));

const { TextArea } = Input;

const ConfirmModal: React.FC<{
  onAction?: (desc?: string) => void; // only action
  onClick?: () => void; // every click on modal
  header?: string;
  type: ConfirmMoalType;
  visible?: boolean;
}> = props => {
  const {
    type,
    visible: visibleProps,
    onAction: onActionProps,
    onClick,
  } = props;
  const [visible, setVisible] = useState(false);
  const [text, setText] = useState('');

  useEffect(() => {
    //   for accept state from props
    visibleProps && setVisible(visibleProps);
  }, [visibleProps]);

  function onBack() {
    setVisible(false);
    onClick && onClick();
  }
  function onAction() {
    onActionProps && onActionProps(text);
    setVisible(false);
    onClick && onClick();
  }

  return (
    <Modal
      visible={visible}
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
            onChange={s => setText(s.target.value)}
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
          <ModalFooter onAction={onAction} onBack={onBack} type={type} />
        </Col>
      </Row>
    </Modal>
  );
};

export default ConfirmModal;
