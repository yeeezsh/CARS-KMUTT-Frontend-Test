import { Checkbox } from 'antd';
import Form, { FormComponentProps } from 'antd/lib/form';
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
import CustomBreakLine from '../shared/CustomBreakLine';
import CustomLabel from '../shared/CustomLabel';
import CustomParagraph from '../shared/CustomParagraph';
import CustomSubHeader from '../shared/CustomSubHeader';
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

// constant
const TIME_FORMAT = 'HH:mm';
const DATE_FORMAT_FULL_MONTH = 'DD-MMMM-YYYY';

const OverviewMeeting: React.FC<FormComponentProps & Props> = props => {
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
          {moment(calendarData?.date).format(DATE_FORMAT_FULL_MONTH)}
        </CustomParagraph>
        <CustomLabel>เวลา</CustomLabel>
        <CustomParagraph>
          {moment(calendarData?.startTime).format(TIME_FORMAT)} -{' '}
          {moment(calendarData?.stopTime).format(TIME_FORMAT)}
        </CustomParagraph>

        {/* facility */}
        <div
          style={{
            visibility:
              props.showFacility === false ? 'hidden' : 'visible',
          }}
        >
          <CustomBreakLine />
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
                      TIME_FORMAT,
                    )}{' '}
                  ถึงเวลา{' '}
                  {facilityData &&
                    moment(facilityData?.stopAirTime).format(
                      TIME_FORMAT,
                    )}{' '}
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
                      TIME_FORMAT,
                    )}{' '}
                  ถึงเวลา{' '}
                  {facilityData &&
                    moment(facilityData.stopSoundTime).format(
                      TIME_FORMAT,
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
