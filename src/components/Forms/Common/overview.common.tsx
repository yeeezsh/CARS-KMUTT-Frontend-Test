import { Checkbox, Form } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import Button from 'Components/Button';
import ButtonActionLayout from 'Components/Layout/ButtonActionLayout';
import OverviewBorderLayout from 'Components/Layout/OverviewBorderLayout';
import Outline from 'Components/Outline';
import moment from 'moment';
import WhiteSpace from 'Pages/Areas/Common/common/WhiteSpace';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootReducersType } from 'Store/reducers';
import {
  fillForm,
  finishFormAction,
  setFormCurrentIndex,
} from 'Store/reducers/areaForm/actions';
import { AreaInfo } from 'Store/reducers/areaForm/types';
import CustomBreakLine from './common/CustomBreakLine';
import CustomSubHeader from './common/CustomSubHeader';
import { FacilityForm } from './facility';
import {
  FORM_COMMON_LAYOUT_EXPAND_OFFSET,
  FORM_COMMON_LAYOUT_MARGIN_TOP,
} from './layout.constant';
import OverviewShareComponent from './overview.share.component';

interface Props {
  ind?: number;
  data?: {
    forms: any;
    area: AreaInfo;
  };
  viewOnly?: boolean;
}

const OverviewCommonForm: React.FC<FormComponentProps & Props> = props => {
  console.log('overview common props data', props.data);
  const CUR_IND = props.ind || 3;
  const { validateFields } = props.form;
  const dispatch = useDispatch();
  const { forms, area } =
    props.data || useSelector((s: RootReducersType) => s.AreaFormReducers);

  const facilityData: FacilityForm | undefined = forms[2];

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
      <OverviewBorderLayout
        viewOnly={props.viewOnly}
        expandOffset={FORM_COMMON_LAYOUT_EXPAND_OFFSET}
        marginTop={FORM_COMMON_LAYOUT_MARGIN_TOP}
      >
        {!props.viewOnly && (
          <Outline style={{ color: '#1890FF' }}>ข้อมูลการจอง</Outline>
        )}

        {/* overview section */}
        {area && <OverviewShareComponent data={{ forms, area }} />}

        <CustomBreakLine />
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

        <WhiteSpace size={25} />

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
  name: 'overview-common',
})(OverviewCommonForm);
