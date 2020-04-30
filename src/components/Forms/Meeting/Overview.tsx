import React, { useEffect } from 'react';
import { AreaInfo } from 'Store/reducers/areaForm/types';
import BreakingLine from 'Components/BreakingLine';
import Outline from 'Components/Outline';
import Form, { FormComponentProps } from 'antd/lib/form';
import { useDispatch, useSelector } from 'react-redux';
import { RootReducers } from 'Store/reducers';
import { FacilityForm } from 'Pages/Areas/Common/common/forms/facility';
import {
  setFormCurrentIndex,
  fillForm,
  finishFormAction,
} from 'Store/reducers/areaForm/actions';
import { Col, Checkbox, Row } from 'antd';
import moment from 'moment';
import Button from 'Components/Button';
import { CalendarForm } from './Calendar';

interface Props {
  ind?: number;
  data?: {
    forms: any;
    area: AreaInfo;
  };
  viewOnly?: boolean;
}

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
const Overview: React.FC<FormComponentProps & Props> = props => {
  console.log('overview common props data', props.data);
  const CUR_IND = props.ind || 3;
  const { validateFields } = props.form;
  const dispatch = useDispatch();
  const { forms, area } =
    props.data || useSelector((s: RootReducers) => s.AreaFormReducers);
  const calendarData: CalendarForm | undefined = forms[0];
  const facilityData: FacilityForm | undefined = forms[1];

  //   set index when form is loaded
  useEffect(() => {
    if (props.viewOnly) return; // prevent when viewOnly
    dispatch(setFormCurrentIndex(CUR_IND));
  }, []);

  function onSubmit() {
    validateFields((err, values) => {
      dispatch(fillForm({ form: values, valid: false }));
      if (!err) {
        dispatch(fillForm({ form: values, valid: true }));
        dispatch(finishFormAction());
      }
    });
  }
  return (
    <React.Fragment>
      <Col
        style={{
          border: props.viewOnly ? '' : '1px solid #1890FF',
          padding: '0px 16px 16px 16px',
        }}
        span={24}
      >
        {!props.viewOnly && (
          <Outline style={{ color: '#1890FF' }}>ข้อมูลการจอง</Outline>
        )}
        {/* overview section */}
        <CustomLabel>สถานที่</CustomLabel>
        <CustomParagraph>{area?.label}</CustomParagraph>
        <CustomLabel>วันที่จอง</CustomLabel>
        <CustomParagraph>
          {moment(calendarData?.date).format('DD-MMMM-YYYY')}
        </CustomParagraph>
        <CustomLabel>เวลา</CustomLabel>
        <CustomParagraph>
          {moment(calendarData?.startTime).format('HH:mm')} -{' '}
          {moment(calendarData?.stopTime).format('HH:mm')}
        </CustomParagraph>

        <CustomBrakeLine />

        {/* facility */}
        <CustomSubHeader>
          เครื่องปรับอากาศและเครื่องขยายเสียง
        </CustomSubHeader>

        <div>
          <Checkbox
            checked={(facilityData && facilityData.airRequired) || false}
            disabled={facilityData && !facilityData.airRequired}
          >
            <b>เครื่องปรับอากาศ</b>
            {facilityData && facilityData.airRequired && (
              <p>
                ตั้งแต่เวลา{' '}
                {facilityData &&
                  moment(facilityData?.startAirTime).format('HH.mm')}{' '}
                ถึงเวลา{' '}
                {facilityData &&
                  moment(facilityData?.stopAirTime).format('HH.mm')}{' '}
                น.
              </p>
            )}
          </Checkbox>
        </div>

        <div>
          <Checkbox
            checked={(facilityData && facilityData.soundRequired) || false}
            disabled={facilityData && !facilityData.soundRequired}
          >
            <b>เครื่องขยายเสียง</b>
            {facilityData && facilityData.soundRequired && (
              <p>
                ตั้งแต่เวลา{' '}
                {facilityData &&
                  moment(facilityData.startSoundTime).format('HH.mm')}{' '}
                ถึงเวลา{' '}
                {facilityData &&
                  moment(facilityData.stopSoundTime).format('HH.mm')}{' '}
                น.
              </p>
            )}
          </Checkbox>
        </div>

        {/* action */}
        {!props.viewOnly && (
          <Col span={24}>
            <Row type="flex" justify="center">
              <Col span={22}>
                <Button type="confirm" onClick={onSubmit}>
                  ยืนยันข้อมูลการจอง
                </Button>
              </Col>
            </Row>
          </Col>
        )}
      </Col>
    </React.Fragment>
  );
};

export default Form.create<FormComponentProps & Props>({
  name: 'overview-meeting',
})(Overview);
