import { Col, Icon, Row } from 'antd';
import {
  AreaForm,
  EquipmentForm,
  FacilityForm,
  OverviewCommonSportForm,
  ProjectForm,
  RequestorForm,
  ReturnForm,
} from 'Components/Forms/Common';
import React, { useEffect, useState } from 'react';
import Loadable from 'react-loadable';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, useHistory, useLocation } from 'react-router';
import { areaService } from 'Services/area/area.service';
import { taskFormAPI } from 'Services/task/form';
import { RootReducersType } from 'Store/reducers';
// store / data
import {
  initForm,
  setAreaInfoForm,
} from 'Store/reducers/areaForm/actions';
import { AreaFormReducer } from 'Store/reducers/areaForm/types';
// assets
import sharedStyles from '../common/styles/styles.module.css';
import WhiteSpace from '../common/WhiteSpace';
import stepsList from './steps';

const StateSteps = Loadable({
  loader: () => import('Components/StateSteps'),
  loading: () => null,
});
const Badge = Loadable({
  loader: () => import('Components/Badge'),
  loading: () => null,
});
const PageLayout = Loadable({
  loader: () => import('Components/Layout/Page/PageLayout'),
  loading: () => null,
});
const BackCard = Loadable({
  loader: () => import('Components/BackCard'),
  loading: () => null,
});
const Outline = Loadable({
  loader: () => import('Components/Outline'),
  loading: () => null,
});
const ConfirmModal = Loadable({
  loader: () => import('Components/AcceptedModal'),
  loading: () => null,
});

// constant
const MAX_STEPS = 6;

const AreaCommonSportPage: React.FC<{
  noInit?: boolean;
  editMode?: boolean;
  useModal?: boolean;
  onSend?: (forms: AreaFormReducer) => void;
}> = props => {
  const forms = useSelector((s: RootReducersType) => s.AreaFormReducers);
  const steps = forms.step;
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation().pathname;
  const useModal = props.useModal !== undefined ? props.useModal : true;

  const areaId = location.split('/')[3];

  // once
  useEffect(() => {
    if (!props.noInit) dispatch(initForm({ size: MAX_STEPS }));
    areaId &&
      areaService
        .getAreaInfo(areaId)
        .then(area => {
          dispatch(setAreaInfoForm(area));
        })
        .then(() => {
          // pre load other forms
          ProjectForm.preload();
          AreaForm.preload();
          FacilityForm.preload();
          EquipmentForm.preload();
          OverviewCommonSportForm.preload();
        });
  }, []);

  function goBack() {
    if (steps === 0) {
      return history.goBack();
    }
    let unit = 1;

    // skip condition
    const RIGHT_STEP = 5;
    if (RIGHT_STEP === steps) unit = 2;

    const oldPath = location;
    const pathStep = steps + 1;
    const backPath = oldPath.slice(0, -1) + (pathStep - unit);

    return history.replace(backPath);
  }

  function goHome() {
    return history.push('/');
  }

  const [modal, setModal] = useState(false);

  function sendData() {
    props.onSend && props.onSend(forms);
    !props.editMode && taskFormAPI.createSportTask(forms);
  }

  // when steps change
  useEffect(() => {
    if (steps === 0) return;
    let unit = 1;

    // skip when no equipment acquire
    const CONDITION_IND_CHECK = 3;
    const SKIP_IND_PAGE = 4;
    const equipmentForm = forms.forms[CONDITION_IND_CHECK];
    const mustReturn =
      Object.keys(equipmentForm).some(e => equipmentForm[e] > 0) ||
      equipmentForm.other;
    if (!mustReturn && steps === SKIP_IND_PAGE) unit = 2;
    console.log('must return', mustReturn);

    const oldPath = location;
    const newPath = oldPath.slice(0, -1) + (steps + unit);
    history.replace(newPath);
  }, [steps]);

  console.log('ready to send form', forms.finish);
  if (forms.finish) {
    sendData();
    useModal && setModal(true);
    // then reset form
    // dispatch({ type: 'INIT_FORM', payload: { size: 7 } });
    dispatch(initForm({ size: MAX_STEPS }));
  }

  return (
    <PageLayout title="จองพื้นที่ส่วนกลาง">
      {/* confirm modal */}
      <ConfirmModal
        desc={{
          main:
            'เมื่ออาจารย์ที่ปรึกษาโครงการยืนยันการขอใช้สถานที่ระบบจึงจะส่งข้อมูลการจองไปยังเจ้าหน้าที่',
        }}
        visible={modal}
        onClick={goHome}
      />

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
                size="s"
                current={steps}
                steps={stepsList.map(({ label }) => ({ label }))}
              />
            </Col>
          </Row>
        </Col>

        {/* back card */}
        <Col style={{ marginTop: '4px', marginBottom: '4px' }} span={14}>
          <BackCard onClick={goBack}>
            {steps === 0
              ? 'เลือกประเภทกิจกรรม'
              : stepsList[steps - 1].desc}
            {/* {backCard[step - 1]} */}
          </BackCard>
        </Col>

        {/* Badge */}
        {/* when overview hide this */}
        {steps !== MAX_STEPS && (
          <Col style={{ marginBottom: '-8px' }} span={24}>
            {/* <Row type="flex" justify="start"> */}
            <Badge>
              {forms.area?._id ? (
                forms.area.label
              ) : (
                <Icon type="loading" />
              )}
            </Badge>
            {/* </Row> */}
          </Col>
        )}
      </Row>

      {/* spacing between fixed inner header */}
      <div style={{ height: '145px' }} />

      {/* when overview hide this */}
      {steps !== MAX_STEPS && <Outline>ฟอร์มขอใช้บริการ</Outline>}

      <Switch>
        <Route path="**/1">
          <RequestorForm ind={0} />
          <WhiteSpace />
        </Route>
        <Route path="**/2">
          <ProjectForm ind={1} />
          <WhiteSpace />
        </Route>
        <Route path="**/3">
          <AreaForm ind={2} />
          <WhiteSpace />
        </Route>
        <Route path="**/4">{<EquipmentForm ind={3} />}</Route>
        <Route path="**/5">
          <ReturnForm ind={4} />
          <WhiteSpace />
        </Route>
        <Route path="**/6">
          <FacilityForm ind={5} />
          <WhiteSpace />
        </Route>
        <Route path="**/7">
          <OverviewCommonSportForm ind={6} />
        </Route>
      </Switch>
    </PageLayout>
  );
};

export default AreaCommonSportPage;
