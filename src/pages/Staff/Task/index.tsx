import React, { useEffect, useState } from 'react';
import Loadable from 'react-loadable';
import { Row, Col } from 'antd';
import moment from 'moment';
import { useLocation, useHistory } from 'react-router';
import { TaskDetail } from 'Models/task/task.interface';
import { taskAPI } from 'Models/task';

const StaffLayout = Loadable({
  loader: () => import('Components/Layout/Staff/Home'),
  loading: () => null,
});
const BackCard = Loadable({
  loader: () => import('Components/BackCard'),
  loading: () => null,
});
const Badge = Loadable({
  loader: () => import('Components/Badge'),
  loading: () => null,
});
const StateCardIconColor = Loadable({
  loader: () => import('Components/StateCard/icon'),
  loading: () => null,
});
const UsersReserveList = Loadable({
  loader: () => import('Components/UsersReserveList'),
  loading: () => null,
});
const Button = Loadable({
  loader: () => import('Components/Button'),
  loading: () => null,
});

import xIcon from 'Assets/icons/button/x.svg';
import { mainStyle, detailStyle, CustomBrakeLine } from './helper';

const TaskPage: React.FC = () => {
  const location = useLocation();
  const taskId = location.pathname.split('/')[3];

  const history = useHistory();
  function onBack() {
    return history.goBack();
  }

  const initTask: TaskDetail = {
    _id: '',
    staff: [],
    requestor: [],
    reserve: [],
    state: [],
    area: {
      _id: '',
      name: '',
      label: '',
      type: '',
    },
    building: {
      _id: '',
      name: '',
      label: '',
      type: '',
    },
    cancle: false,
    createAt: moment(),
    updateAt: moment(),
  };

  const [task, setTask] = useState(initTask);

  //   fetch task
  useEffect(() => {
    taskAPI.getTaskById(taskId).then(t => t && setTask(t));
  }, []);

  console.log(task);
  return (
    <StaffLayout>
      <Row>
        <Col>
          <BackCard
            onClick={onBack}
            styles={{ fontSize: '18px', fontWeight: 'bold' }}
          >
            ข้อมูลการจอง
          </BackCard>
        </Col>
      </Row>
      <Row style={{ marginTop: '24px' }} justify="center" type="flex">
        {/* header */}
        <Col span={20} style={{ ...mainStyle }}>
          รหัสการจอง : {task._id}
        </Col>
        <Col
          span={20}
          style={{
            ...mainStyle,
            ...{
              fontSize: '14px',
              color: '#666666',
              background: '#FFFFFF',
              marginTop: '-4px',
              zIndex: -1,
              minHeight: '350px',
              padding: '32px 72px 32px 72px',
            },
          }}
        >
          {/* detail card */}
          <Row justify="center" type="flex">
            {/* main status */}
            <Col span={24}>
              <Row>
                <Col span={6}>
                  <Badge
                    style={{
                      //   width: '150px',
                      fontSize: '16px',
                      textAlign: 'center',
                    }}
                  >
                    สถานะการจอง
                  </Badge>
                </Col>
                <Col
                  span={6}
                  style={{ marginLeft: '14px', marginTop: '4px' }}
                >
                  <StateCardIconColor type={task.state.slice(-1)[0]} />
                </Col>
              </Row>
            </Col>

            {/* top detail */}
            <Col span={8}>
              <b>ประเภทการจอง</b>{' '}
              <span style={detailStyle}>
                {task.area.building && task.area.building.type}
              </span>
            </Col>
            <Col span={8} offset={8} style={{ textAlign: 'right' }}>
              <b>วันที่</b>{' '}
              <span style={detailStyle}>
                {task.createAt.format('DD-MM-YYYY')}
              </span>
            </Col>

            <CustomBrakeLine />

            {/* bottom detail */}
            {/* area */}
            <Col span={24}>
              <b>สนามกีฬา</b>{' '}
              <span style={detailStyle}>
                {task.area.building && task.area.label}
              </span>
            </Col>

            {/* date */}
            <Col span={24}>
              <b>วันที่จอง</b>{' '}
              <span style={detailStyle}>
                {task.reserve[0] &&
                  task.reserve[0].start?.format('DD-MM-YYYY')}
              </span>
            </Col>

            {/* time */}
            <Col span={24}>
              <b>เวลาที่จอง</b>{' '}
              <span style={detailStyle}>
                {task.reserve[0] && task.reserve[0].start?.format('HH.mm')}{' '}
                -{task.reserve[0] && task.reserve[0].stop?.format('HH.mm')}
              </span>
            </Col>

            {/* requestor status list */}
            <Col style={{ fontWeight: 'normal' }} span={24}>
              <p style={{ color: '#1890FF', padding: 0, margin: 0 }}>
                <b>รหัสนักศึกษา</b>
              </p>
              <UsersReserveList users={task.requestor} />
            </Col>

            <CustomBrakeLine />

            <Button
              style={{
                width: '175px',
                backgroundColor: '#F5222D',
              }}
              fontSize={16}
              padding={4}
            >
              <img style={{ padding: 4 }} src={xIcon} alt="x-icon" />
              ยกเลิกการจอง
            </Button>
          </Row>
        </Col>
      </Row>
    </StaffLayout>
  );
};

export default TaskPage;
