import { Col, Icon, Row } from 'antd';
import Form, { FormComponentProps } from 'antd/lib/form';
import {
  Calendar as CalendarFormComp,
  Overview as OverviewForm,
} from 'Components/Forms/Meeting';
import { CalendarForm } from 'Components/Forms/Meeting/Calendar';
import { areaAPI } from 'Models/area';
import { taskMeetingAPI } from 'Models/task/meeting';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import Loadable from 'react-loadable';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, useHistory, useLocation } from 'react-router';
import { RootReducersType } from 'Store/reducers';
import {
  initForm,
  setAreaInfoForm,
  setFormCurrentIndex,
} from 'Store/reducers/areaForm/actions';
import { FacilityForm } from '../../../../components/Forms/Common';
// styles
import sharedStyles from '../common/styles/styles.module.css';
// store & data
import stepsList from './steps/club';

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
const MeetingSnackBar = Loadable({
  loader: () => import('../common/MeetingSnackBar'),
  loading: () => null,
});

// constant
const MAX_STEPS = 3;
const AREA_PARAM_IND = 5;

const FormClub: React.FC<FormComponentProps> = () => {
  const forms = useSelector((s: RootReducersType) => s.AreaFormReducers);
  const steps = forms.step;
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation().pathname;
  const [modal, setModal] = useState<boolean>(false);
  const [failed, setFailed] = useState<boolean>(false);

  const areaId = location.split('/')[AREA_PARAM_IND];

  function initFormHelper() {
    areaAPI.getAreaInfo(areaId).then(a => dispatch(setAreaInfoForm(a)));
    dispatch(initForm({ size: MAX_STEPS }));
    dispatch(setFormCurrentIndex(0));
  }

  async function sendData() {
    const calendarData: CalendarForm | undefined = forms.forms[0];
    try {
      await taskMeetingAPI.createMeetingClubTask({
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
      setModal(true);
      dispatch(initForm({ size: MAX_STEPS }));
    } catch {
      // duplicated reservation
      const FINISH_PAGE = '/' + MAX_STEPS;
      const FIRST_STEP_PAGE = '/1';

      const target = location.replace(FINISH_PAGE, FIRST_STEP_PAGE);
      history.replace(target);
      setFailed(true);
      initFormHelper();
    }
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
  useEffect(() => initFormHelper(), []);

  // when steps change
  useEffect(() => {
    if (steps === 0) return;
    const oldPath = location;
    const newPath = oldPath.slice(0, -1) + (steps + 1);
    history.push(newPath);
  }, [steps]);

  useEffect(() => {
    if (forms.finish) {
      console.log('send data');
      sendData();
    }
  }, [forms.finish]);

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

      {failed && <MeetingSnackBar />}
    </PageLayout>
  );
};

export default Form.create({ name: 'formclub' })(FormClub);
