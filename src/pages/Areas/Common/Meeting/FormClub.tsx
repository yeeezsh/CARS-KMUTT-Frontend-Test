import { Col, Icon, Row } from 'antd';
import {
  Calendar as CalendarFormComp,
  Overview as OverviewForm,
} from 'Components/Forms/Meeting';
import { CalendarForm } from 'Components/Forms/Meeting/Calendar';
import moment, { Moment } from 'moment';
import React, { useEffect, useState } from 'react';
import Loadable from 'react-loadable';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, useHistory, useLocation } from 'react-router';
import { areaAPI } from 'Services/area';
import { AreaServiceResponseAPI } from 'Services/area/@interfaces/area.interfaces';
import { taskMeetingAPI } from 'Services/task/meeting';
import { RootReducersType } from 'Store/reducers';
import {
  initForm,
  setAreaInfoForm,
  setFormCurrentIndex,
} from 'Store/reducers/areaForm/actions';
import { FacilityForm } from '../../../../components/Forms/Common';
import {
  WHITE_SPACE,
  WHITE_SPACE_OVERVIEW_OFFSET,
} from '../common/constant';
// styles
import sharedStyles from '../common/styles/styles.module.css';
import WhiteSpace from '../common/WhiteSpace';
// store & data
import stepsList from './steps/club';

const PageLayout = Loadable({
  loader: () => import('Components/Layout/Page/PageLayout'),
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

const FormClub: React.FC<{
  areaInfo?: AreaServiceResponseAPI;
  createByStaff?: boolean;
  selectDate?: (date: Moment) => void;
  onSubmit?: () => void;
}> = props => {
  const forms = useSelector((s: RootReducersType) => s.AreaFormReducers);
  const steps = forms.step;
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation().pathname;
  const [modal, setModal] = useState<boolean>(false);
  const [failed, setFailed] = useState<boolean>(false);

  const areaId =
    props.areaInfo?._id || location.split('/')[AREA_PARAM_IND];

  function initFormHelper() {
    areaAPI.getAreaInfo(areaId).then(a => dispatch(setAreaInfoForm(a)));
    dispatch(initForm({ size: MAX_STEPS }));
    dispatch(setFormCurrentIndex(0));
  }

  async function sendData() {
    try {
      const calendarData: CalendarForm | undefined = forms.forms[0];
      const parsed = {
        area: areaId,
        forms: forms.forms,
        time: [
          {
            start: moment(calendarData?.startTime).toDate(),
            stop: moment(calendarData?.stopTime).toDate(),
            allDay: false,
          },
        ],
      };
      if (props.createByStaff) {
        await taskMeetingAPI.createMeetingClubTaskByStaff(parsed);
      } else {
        await taskMeetingAPI.createMeetingClubTask(parsed);
      }

      !props.createByStaff && setModal(true);
      props.onSubmit && props.onSubmit();
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
      return history.goBack();
    }
    dispatch(setFormCurrentIndex(steps - 1));
    const oldPath = location;
    const pathStep = steps + 1;
    const backPath = oldPath.slice(0, -1) + (pathStep - 1);
    return history.replace(backPath);
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
    history.replace(newPath);
  }, [steps]);

  useEffect(() => {
    if (forms.finish) {
      console.log('send data');
      sendData();
    }
  }, [forms.finish]);

  return (
    <PageLayout title="จองห้องประชุม">
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

      <WhiteSpace />
      <Switch>
        <Route path="/*1">
          <Outline style={{ margin: 0 }}>
            ระบุวันที่เวลาที่ใช้บริการ
          </Outline>
          <OutlineDesc>กรุณาจองล่วงหน้า 3 วันก่อนใช้บริการ</OutlineDesc>
          <CalendarFormComp
            ind={0}
            areaInfo={props.areaInfo}
            selectDate={e => props.selectDate && props.selectDate(e)}
          />
        </Route>
        <Route path="/*2">
          <FacilityForm ind={1} showStepLabel={false} />
        </Route>
        <Route path="/*3">
          <WhiteSpace size={WHITE_SPACE_OVERVIEW_OFFSET} />
          <OverviewForm ind={2} />
        </Route>
      </Switch>
      <WhiteSpace size={WHITE_SPACE} />

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

export default FormClub;
