import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import { Switch, Route, useHistory, useLocation } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';

import PageLayout from 'Components/Layout/Page';

import stepsList from './steps';

// assets
import sharedStyles from '../common/styles/styles.module.css';
import StateSteps from 'Components/StateSteps';
import Badge from 'Components/Badge';

import BackCard from 'Components/BackCard';
import Outline from 'Components/Outline';
import { RootReducers } from 'Store/reducers';

// forms
import { RequestorForm } from '../common/forms';
import ProjectForm from '../common/forms/project';
import FacilityForm from '../common/forms/facility';
import OverviewGeneralForm from '../common/forms/overview.general';

// constant
const MAX_STEPS = 3;

const Activity: React.FC = () => {
  const forms = useSelector((s: RootReducers) => s.AreaFormReducers);
  const steps = forms.step;
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation().pathname;

  useEffect(() => {
    dispatch({ type: 'INIT_FORM', payload: { size: 4 } });
  }, []);

  // when steps change
  useEffect(() => {
    if (steps === 0) return;
    const oldPath = location;
    const newPath = oldPath.slice(0, -1) + (steps + 1);
    history.push(newPath);
  }, [steps]);

  // const [canNext, setCanNext] = useState(false);
  console.log('forms', forms);

  return (
    <PageLayout titile="จองพื้นที่ส่วนกลาง">
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
          <BackCard
          // onClick={}
          >
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
            <Row type="flex" justify="start">
              <Badge>test ja</Badge>
            </Row>
          </Col>
        )}
      </Row>

      {/* spacing between fixed inner header */}
      <div style={{ height: '145px' }} />

      {/* when overview hide this */}
      {steps !== MAX_STEPS && <Outline>ฟอร์มขอใช้บริการ</Outline>}

      <Switch>
        <Route path="/*1">
          <RequestorForm />
        </Route>
        <Route path="/*2">
          <ProjectForm />
        </Route>
        <Route path="/*3">
          <FacilityForm />
        </Route>
        <Route path="/*4">
          <OverviewGeneralForm />
        </Route>
      </Switch>
    </PageLayout>
  );
};

export default Activity;
