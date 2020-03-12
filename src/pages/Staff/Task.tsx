import React, { useEffect, useState } from 'react';
import StaffLayout from 'Components/Layout/Staff/Home';
import { useLocation } from 'react-router';
import { Row, Col } from 'antd';
import BackCard from 'Components/BackCard';
import BreakingLine from 'Components/BreakingLine';
import { taskAPI } from 'Models/task';
import { TaskDetail } from 'Models/task/task.interface';
import moment from 'moment';
import Badge from 'Components/Badge';
import StateCardIconColor from 'Components/StateCard/icon';

const CustomBrakeLine: React.FC = () => (
  <Col span={24}>
    <div style={{ height: '24px' }} />
    <BreakingLine />
  </Col>
);

const mainStyle: React.CSSProperties = {
  borderRadius: 4,
  padding: '12px 24px 12px 24px',
  color: '#FFFFFF',
  fontSize: '18px',
  fontWeight: 'bold',
  background: '#FF682B',
  boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.15)',
};

const detailStyle: React.CSSProperties = {
  fontWeight: 'normal',
};

const TaskPage: React.FC = () => {
  const location = useLocation();
  const taskId = location.pathname.split('/')[3];

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
      building: '',
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
          <BackCard styles={{ fontSize: '18px', fontWeight: 'bold' }}>
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
          </Row>
        </Col>
      </Row>
    </StaffLayout>
  );
};

export default TaskPage;
