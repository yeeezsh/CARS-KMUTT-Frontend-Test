import React, { useEffect, useState } from 'react';
import { Form, Row, Col, Checkbox } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import Button from 'Components/Button';
import { useDispatch } from 'react-redux';

import Outline from 'Components/Outline';
import BreakingLine from 'Components/BreakingLine';
import Badge from 'Components/Badge';

// custom components
const CustomBrakeLine: React.FC = () => (
  <BreakingLine color="#91D5FF" lineSize={0.25} />
);
const CustomSubHeader: React.FC = props => (
  <Outline style={{ color: '#1890FF', fontSize: '14px', margin: 0 }}>
    {props.children}
  </Outline>
);

const CustomLabel: React.FC = props => (
  <p
    style={{
      color: '#666666',
      fontSize: '14px',
      fontWeight: 'bold',
      margin: 0,
    }}
  >
    {props.children}
  </p>
);

const DownloadBtn: React.FC = () => (
  <Button
    fontColor="#1890FF"
    fontSize={12}
    style={{
      marginLeft: '50px',
      width: '75px',
      height: '30px',
      padding: 0,
      backgroundColor: '#E6F7FF',
    }}
  >
    ดาวน์โหลด
  </Button>
);

const CustomParagraph: React.FC = props => (
  <p
    style={{
      color: '#666666',
      fontSize: '14px',
      margin: 0,
      marginLeft: '8px',
    }}
  >
    {props.children}
  </p>
);

// constant
const CUR_IND = 3;
const OverviewGeneralForm: React.FC<FormComponentProps & {
  ind?: number;
}> = props => {
  const { validateFields } = props.form;
  const dispatch = useDispatch();
  // const canNext = useSelector(
  //   (s: RootReducers) => s.AreaFormReducers.canNext,
  // );

  //   set index when form is loaded
  useEffect(() => {
    dispatch({
      type: 'SET_FORM_CUR',
      payload: { cur: props.ind || CUR_IND },
    });
  }, []);

  function onSubmit() {
    validateFields((err, values) => {
      dispatch({
        type: 'FILL_FORM',
        payload: {
          form: values,
          valid: false,
        },
      });
      if (!err) {
        dispatch({
          type: 'FILL_FORM',
          payload: {
            form: values,
            valid: true,
          },
        });
        dispatch({ type: 'SUBMIT_FORM' });
      }
    });
  }

  return (
    <React.Fragment>
      <Col
        style={{ border: '1px solid #1890FF', padding: '16px' }}
        span={24}
      >
        <Outline style={{ color: '#1890FF' }}>ข้อมูลการจอง</Outline>
        {/* overview section */}
        <CustomBrakeLine />
        <CustomLabel>สถานที่</CustomLabel>
        <CustomParagraph>
          อาคารพระจอมเกล้าราชานุสรณ์ 190 ปี มจธ. (จัดกิจกรรม)
        </CustomParagraph>
        <CustomLabel>วันที่จอง</CustomLabel>
        <CustomParagraph>
          ตั้งแต่ 12 ธันวาคม 2562, 08.00 น. <br />
          ถึง 13 ธันวาคม 2562, 18.00 น.
        </CustomParagraph>
        <CustomBrakeLine />
        {/* project */}
        <CustomSubHeader>รายละเอียดผู้ขอใช้บริการ</CustomSubHeader>
        <CustomLabel>รหัสนักศึกษา</CustomLabel>
        <CustomParagraph>60070501000</CustomParagraph>
        <CustomLabel>ชื่อ-นามสกุล</CustomLabel>
        <CustomParagraph>ณเดชน์ คุกิมิยะ</CustomParagraph>
        <CustomLabel>คณะ</CustomLabel>
        <CustomParagraph>วิศวกรรมศาสตร์</CustomParagraph>
        <CustomLabel>ภาควิชา</CustomLabel>
        <CustomParagraph>วิศวกรรมคอมพิวเตอร์</CustomParagraph>
        <CustomLabel>ภาควิชา</CustomLabel>
        <CustomParagraph>วิศวกรรมคอมพิวเตอร์</CustomParagraph>
        <CustomLabel>โทรศัพท์</CustomLabel>
        <CustomParagraph>091-234-5678</CustomParagraph>
        <CustomBrakeLine />
        {/* requestor */}
        <CustomSubHeader>รายละเอียดการใช้บริการ</CustomSubHeader>
        <CustomLabel>ชื่อโครงการ</CustomLabel>
        <CustomParagraph>โครงการสวัสดีปีใหม่</CustomParagraph>
        <CustomLabel>ไฟล์โครงการที่แนบมาด้วย</CustomLabel>
        <CustomParagraph>
          โครงการสวัสดีปีใหม่.pdf <DownloadBtn />
        </CustomParagraph>

        <CustomLabel>อาจารย์ที่ปรึกษา</CustomLabel>
        <CustomParagraph>ผศ.ดร.จอห์น โด</CustomParagraph>

        <CustomBrakeLine />
        {/* facility */}
        <CustomSubHeader>
          เครื่องปรับอากาศและเครื่องขยายเสียง
        </CustomSubHeader>

        <div>
          <Checkbox checked={true}>
            <b>เครื่องปรับอากาศ</b>
            <p>ตั้งแต่เวลา 07.00 ถึงเวลา 18.00 น.</p>
          </Checkbox>
        </div>

        <div style={{ marginTop: '-30px' }}>
          <Checkbox checked={false} disabled={true}>
            <b>เครื่องขยายเสียง</b>
          </Checkbox>
        </div>

        <CustomBrakeLine />
        {/* action */}
        <Col span={24}>
          <Row type="flex" justify="center">
            <Col span={22}>
              <Button type="confirm" onClick={onSubmit}>
                ยืนยันข้อมูลการจอง
              </Button>
            </Col>
          </Row>
        </Col>
      </Col>
    </React.Fragment>
  );
};

export default Form.create({ name: 'requestor' })(OverviewGeneralForm);
