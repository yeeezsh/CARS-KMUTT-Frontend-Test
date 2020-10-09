import { Checkbox } from 'antd';
import Form, { FormComponentProps } from 'antd/lib/form';
import BreakingLine from 'Components/BreakingLine';
import Button from 'Components/Button';
// pages
import { FacilityForm } from 'Components/Forms/Common/facility';
import ButtonActionLayout from 'Components/Layout/ButtonActionLayout';
import OverviewBorderLayout from 'Components/Layout/OverviewBorderLayout';
import Outline from 'Components/Outline';
import moment from 'moment';
import WhiteSpace from 'Pages/Areas/Common/common/WhiteSpace';
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
import { CalendarForm } from './CalendarMeeting';

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

const OverviewMeeting: React.FC<FormComponentProps & Props> = props => {
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
      <OverviewBorderLayout viewOnly={props.viewOnly} expandOffset={540}>
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

        <WhiteSpace size={32} />

        {/* action */}
        {!props.viewOnly && (
          <ButtonActionLayout>
            <Button type="confirm" onClick={onSubmit}>
              ยืนยันข้อมูลการจอง
            </Button>
          </ButtonActionLayout>
        )}
      </OverviewBorderLayout>
    </React.Fragment>
  );
};

export default Form.create<FormComponentProps & Props>({
  name: 'overview-meeting',
})(OverviewMeeting);
