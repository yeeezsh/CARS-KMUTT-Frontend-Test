import React, { Component } from 'react';
import { Modal, Row, Col } from 'antd';

import icon from '../../assets/icons/checked.blue.large.svg';
import Button from '../Button';

export default class ActionModal extends Component<
  { visible: boolean; onModal: (action: boolean) => void; desc?: string },
  {
    visible: boolean;
  }
> {
  //   constructor(props: any) {
  //     super(props);
  //     this.state = {
  //       visible: false,
  //     };
  //     const { visible } = this.props;
  //     this.setState({ visible });
  //   }
  render() {
    const { visible, desc, onModal } = this.props;
    return (
      <Modal
        visible={visible}
        footer={null}
        closable={false}
        width={'90%'}
        bodyStyle={{
          padding: '45px 35px 45px 35px',
          minHeight: '125px',
          backgroundColor: '#FFFFFF',
          borderRadius: '4px',
        }}
      >
        <Row type="flex" justify="center">
          <p
            style={{
              fontSize: '24px',
              lineHeight: '36px',
              fontWeight: 'bold',
            }}
          >
            {desc || 'ท่านต้องการยืนยันรีเควส'}
          </p>
        </Row>
        <Row>
          {/* btn action */}
          <Col span={24} style={{ marginTop: '10px' }}>
            <Row type="flex" justify="space-around">
              <Col span={11}>
                <Button onClick={() => onModal(false)}>ย้อนกลับ</Button>
              </Col>
              <Col span={11}>
                <Button
                  style={{ backgroundColor: '#1890FF' }}
                  onClick={() => onModal(true)}
                >
                  ยืนยัน
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Modal>
    );
  }
}
