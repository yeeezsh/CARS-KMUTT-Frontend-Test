import { Checkbox, Col, Row } from 'antd';
import Form, { FormComponentProps } from 'antd/lib/form';
import BreakingLine from 'Components/BreakingLine';
import Button from 'Components/Button';
// pages
import { FacilityForm } from 'Components/Forms/Common/facility';
import Outline from 'Components/Outline';
// hooks
import useWindowResize from 'Hooks/windows.resize';
import moment from 'moment';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// data & store
import { RootReducersType } from 'Store/reducers';
import {
  fillForm,
  finishFormAction,
  setFormCurrentIndex,
} from 'Store/reducers/areaForm/actions';
import { AreaInfo } from 'Store/reducers/areaForm/types';
import { CalendarForm } from './Calendar';

interface Props {
  ind?: number;
  data?: {
    forms: any;
    area: AreaInfo;
  };
  viewOnly?: boolean;
  showFacility?: boolean;
  buttonOffeset?: boolean | number;
}

// constant
const OFFSET_BTN = 595;

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
    props.data || useSelector((s: RootReducersType) => s.AreaFormReducers);
  const calendarData: CalendarForm | undefined = forms[0];
  const facilityData: FacilityForm | undefined = forms[1];

  //   set index when form is loaded
  useEffect(() => {
    if (props.viewOnly) return; // prevent when viewOnly
    dispatch(setFormCurrentIndex(CUR_IND));
  }, []);

  const size = useWindowResize();

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
          // padding: '0px 16px 16px 16px',
          padding: 24,
          marginTop: -16,
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

        {/* facility */}
        <div
          style={{
            visibility:
              props.showFacility === false ? 'hidden' : 'visible',
          }}
        >
          <CustomBrakeLine />
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
                    moment(facilityData?.startAirTime).format(
                      'HH.mm',
                    )}{' '}
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
              checked={
                (facilityData && facilityData.soundRequired) || false
              }
              disabled={facilityData && !facilityData.soundRequired}
            >
              <b>เครื่องขยายเสียง</b>
              {facilityData && facilityData.soundRequired && (
                <p>
                  ตั้งแต่เวลา{' '}
                  {facilityData &&
                    moment(facilityData.startSoundTime).format(
                      'HH.mm',
                    )}{' '}
                  ถึงเวลา{' '}
                  {facilityData &&
                    moment(facilityData.stopSoundTime).format(
                      'HH.mm',
                    )}{' '}
                  น.
                </p>
              )}
            </Checkbox>
          </div>
        </div>
        {/* space */}
        {props.buttonOffeset === false ? null : (
          <div
            style={{
              height:
                size.height - (Number(props.buttonOffeset) || OFFSET_BTN),
            }}
          />
        )}

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
