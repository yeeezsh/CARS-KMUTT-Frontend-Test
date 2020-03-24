import React, { useState } from 'react';
import { Row, Col } from 'antd';
import { Switch, Route } from 'react-router';

import PageLayout from 'Components/Layout/Page';

import stepsList from './steps';

// assets
import sharedStyles from '../common/styles/styles.module.css';
import StateSteps from 'Components/StateSteps';
import Badge from 'Components/Badge';

import { RequestorForm } from '../common/forms';
import BackCard from 'Components/BackCard';
import Outline from 'Components/Outline';

const Activity: React.FC = () => {
  const [steps, setSteps] = useState(0);

  // const [canNext, setCanNext] = useState(false);
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
        <Col style={{ marginTop: '4px', marginBottom: '4px' }} span={10}>
          <BackCard
          // onClick={}
          >
            {steps === 0 ? 'เลือกประเภทกิจกรรม' : stepsList[steps].desc}
            {/* {backCard[step - 1]} */}
          </BackCard>
        </Col>

        {/* Badge */}
        <Col style={{ marginBottom: '-8px' }} span={24}>
          <Row type="flex" justify="start">
            <Badge>test ja</Badge>
          </Row>
        </Col>
      </Row>

      {/* spacing between fixed inner header */}
      <div style={{ height: '145px' }} />

      <Outline>ฟอร์มขอใช้บริการ</Outline>

      <Switch>
        <Route path="/*1">
          <RequestorForm />
        </Route>
        <Route path="/*2">2</Route>
        <Route path="/*3">3</Route>
      </Switch>
      <Row type="flex" justify="center">
        Content ja
      </Row>
    </PageLayout>
  );
};

export default Activity;
