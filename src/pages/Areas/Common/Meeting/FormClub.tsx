import React, { useEffect } from 'react';

import stepsList from './steps/club';
import { useSelector, useDispatch } from 'react-redux';
import { RootReducers } from 'Store/reducers';
import { useLocation, useHistory, Switch, Route } from 'react-router';
import PageLayout from 'Components/Layout/Page';
import Badge from 'Components/Badge';
import { Icon, Row, Col } from 'antd';
import BackCard from 'Components/BackCard';
import StateSteps from 'Components/StateSteps';
import {
  Calendar as CalendarForm,
  Overview as OverviewForm,
} from 'Components/Forms/Meeting';

import sharedStyles from '../common/styles/styles.module.css';
import {
  setAreaInfoForm,
  initForm,
  setFormCurrentIndex,
} from 'Store/reducers/areaForm/actions';

import { areaAPI } from 'Models/area';

import Form, { FormComponentProps } from 'antd/lib/form';
import { FacilityForm } from '../common/forms';

// constant
const MAX_STEPS = 3;
const AREA_PARAM_IND = 5;

const FormClub: React.FC<FormComponentProps> = () => {
  const forms = useSelector((s: RootReducers) => s.AreaFormReducers);
  const steps = forms.step;
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation().pathname;

  const areaId = location.split('/')[AREA_PARAM_IND];

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
            {/* {backCard[step - 1]} */}
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
          <CalendarForm ind={0} />
        </Route>
        <Route path="/*2">
          <FacilityForm ind={1} />
        </Route>
        <Route path="/*3">
          <OverviewForm ind={2} />
        </Route>
      </Switch>
    </PageLayout>
  );
};

export default Form.create({ name: 'formclub' })(FormClub);
