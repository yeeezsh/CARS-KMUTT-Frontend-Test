import React, { Component } from 'react';
import { Modal, Row, Col } from 'antd';
import Outline from 'Components/Outline';
import icon from 'Assets/icons/checked.blue.large.svg';
import Button from 'Components/Button';

export default class ConfirmModal extends Component<
  {
    onClick?: any;
    header?: string;
    desc?: {
      main?: string;
      sub?: string;
    };
    btn?: string;
    visible?: boolean;
  },
  {
    visible: boolean;
  }
> {
  state = {
    visible: false,
  };
  render() {
    const { header, desc, onClick, btn, visible } = this.props;
    const visibleState = visible || this.state.visible;
    return (
      <Modal
        visible={visibleState}
        footer={null}
        closable={false}
        width={'90%'}
        bodyStyle={{
          padding: '45px 35px 45px 35px',
          minHeight: '400px',
          backgroundColor: '#FFFFFF',
          borderRadius: '4px',
        }}
      >
        <Row type="flex" justify="center">
          <Col>
            <img src={icon} alt="icon" />
          </Col>
        </Row>

        {/* header */}
        <Row style={{ marginTop: '12px' }} type="flex" justify="center">
          <Col>
            <Outline style={{ color: '#666666' }}>
              {header || 'ส่งรีเควสสำเร็จ'}
            </Outline>
          </Col>
        </Row>

        {/* description */}
        <Row style={{ marginTop: '-12px' }} type="flex" justify="center">
          <p style={{ textAlign: 'center' }}>
            {desc?.main ||
              'เมื่อเพื่อนร่วมการจองทุกคนกดยืนยันเรียบร้อยแล้ว ระบบจึงจะส่งข้อมูลการจองไปยังเจ้าหน้าที่'}
          </p>
        </Row>

        {/* sub-description */}
        <Row style={{ marginTop: '16px' }} type="flex" justify="center">
          {desc?.sub ? (
            <Col span={22}>
              <p style={{ textAlign: 'center', color: '#979797' }}>
                {desc.sub}
              </p>
            </Col>
          ) : (
            <Col span={22}>
              <p style={{ textAlign: 'center', color: '#979797' }}>
                ดูสถานะการยืนยันการจอง
              </p>
              <p
                style={{
                  textAlign: 'center',
                  color: '#979797',
                  marginTop: '-8px',
                }}
              >
                เมนู &gt; การจองของฉัน &gt; กำลังดำเนินการ
              </p>
            </Col>
          )}
        </Row>

        <Row style={{ marginTop: '24px' }} type="flex" justify="center">
          <Button onClick={onClick}>{btn || 'กลับสู่หน้าหลัก'}</Button>
        </Row>
      </Modal>
    );
  }
}
