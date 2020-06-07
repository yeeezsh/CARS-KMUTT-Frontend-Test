import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { useLocation, useHistory, Switch, Route } from 'react-router';
import { Icon, Row, Col } from 'antd';
import Loadable from 'react-loadable';

import Form, { FormComponentProps } from 'antd/lib/form';

// store & data
import stepsList from './steps/club';
import {
  setAreaInfoForm,
  initForm,
  setFormCurrentIndex,
} from 'Store/reducers/areaForm/actions';
import { RootReducers } from 'Store/reducers';
import { areaAPI } from 'Models/area';

// styles
import sharedStyles from '../common/styles/styles.module.css';

import {
  Calendar as CalendarFormComp,
  Overview as OverviewForm,
} from 'Components/Forms/Meeting';
import { taskMeetingAPI } from 'Models/task/meeting';
import { CalendarForm } from 'Components/Forms/Meeting/Calendar';
import { FacilityForm } from '../../../../components/Forms/Common';

const PageLayout = Loadable({
  loader: () => import('Components/Layout/Page'),
  loading: () => null,
});
const Badge = Loadable({
  loader: () => import('Components/Badge'),
  loading: () => null,
});
const BackCard = Loadable({
  loader: () => import('Components/BackCard'),
  loading: () => null,
});
const StateSteps = Loadable({
  loader: () => import('Components/StateSteps'),
  loading: () => null,
});
const ConfirmModal = Loadable({
  loader: () => import('Components/AcceptedModal'),
  loading: () => null,
});
const Outline = Loadable({
  loader: () => import('Components/Outline'),
  loading: () => null,
});
const OutlineDesc = Loadable({
  loader: () => import('Components/OutlineDesc'),
  loading: () => null,
});

// constant
const MAX_STEPS = 3;
const AREA_PARAM_IND = 5;

const FormClub: React.FC<FormComponentProps> = () => {
  const forms = useSelector((s: RootReducers) => s.AreaFormReducers);
  const steps = forms.step;
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation().pathname;
  const [modal, setModal] = useState<boolean>(false);

  const areaId = location.split('/')[AREA_PARAM_IND];

  function sendData() {
    const calendarData: CalendarForm | undefined = forms.forms[0];
    taskMeetingAPI.createMeetingClubTask({
      area: areaId,
      forms: forms.forms,
      time: [
        {
          start: moment(calendarData?.startTime).toDate(),
          stop: moment(calendarData?.stopTime).toDate(),
          allDay: false,
        },
      ],
    });
  }

  function goBack() {
    if (steps === 0) {
      return history.push('/reserve/area/meeting/areas');
    }
    const oldPath = location;
    const pathStep = steps + 1;
    const backPath = oldPath.slice(0, -1) + (pathStep - 1);
    dispatch(setFormCurrentIndex(steps - 1));
    return history.push(backPath);
  }

  function goHome() {
    return history.push('/');
  }

  // once
  useEffect(() => {
    dispatch(initForm({ size: MAX_STEPS }));
    dispatch(setFormCurrentIndex(0));
    areaAPI.getAreaInfo(areaId).then(a => dispatch(setAreaInfoForm(a)));
  }, []);

  // when steps change
  useEffect(() => {
    if (steps === 0) return;
    const oldPath = location;
    const newPath = oldPath.slice(0, -1) + (steps + 1);
    history.push(newPath);
  }, [steps]);

  if (forms.finish) {
    console.log('send data');
    sendData();
    setModal(true);
    // then reset form
    dispatch(initForm({ size: MAX_STEPS }));
  }
  return (
    <PageLayout titile="จองห้องประชุม">
      {/* Fixed header */}
      <Row
        className={sharedStyles.innerFixedHeader}
        type="flex"
        justify="center"
      >
        {/* steps */}
        <Col style={{ marginTop: '-12px' }} offset={2} span={18}>
          <Row type="flex" justify="center">
            <Col span={20}>
              <StateSteps
                // onClick={this.onClickStep}
                current={steps}
                steps={stepsList.map(({ label }) => ({ label }))}
              />
            </Col>
          </Row>
        </Col>

        {/* back card */}
        <Col style={{ marginTop: '4px', marginBottom: '4px' }} span={14}>
          <BackCard onClick={goBack}>
            {steps === 0 ? 'เลือกสถานที่' : stepsList[steps - 1].desc}
          </BackCard>
        </Col>

        {/* Badge */}
        {/* when overview hide this */}
        {steps !== MAX_STEPS && (
          <Col style={{ marginBottom: '-8px' }} span={24}>
            <Row type="flex" justify="start">
              <Badge>
                {forms.area?._id ? (
                  forms.area.label
                ) : (
                  <Icon type="loading" />
                )}
              </Badge>
            </Row>
          </Col>
        )}
      </Row>

      {/* spacing between fixed inner header */}
      <div style={{ height: '145px' }} />
      <Switch>
        <Route path="/*1">
          <Outline style={{ margin: 0 }}>
            ระบุวันที่เวลาที่ใช้บริการ
          </Outline>
          <OutlineDesc>กรุณาจองล่วงหน้า 3 วันก่อนใช้บริการ</OutlineDesc>
          <CalendarFormComp ind={0} />
        </Route>
        <Route path="/*2">
          <FacilityForm ind={1} showStepLabel={false} />
        </Route>
        <Route path="/*3">
          <OverviewForm ind={2} />
        </Route>
      </Switch>

      {/* confirm modal */}
      <ConfirmModal
        desc={{
          main:
            'เมื่ออาจารย์ที่ปรึกษาโครงการยืนยันการขอใช้สถานที่ระบบจึงจะส่งข้อมูลการจองไปยังเจ้าหน้าที่',
        }}
        visible={modal}
        onClick={goHome}
      />
    </PageLayout>
  );
};

export default Form.create({ name: 'formclub' })(FormClub);
