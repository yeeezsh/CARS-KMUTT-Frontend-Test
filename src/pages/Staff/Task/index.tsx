import { Col, message, Row } from 'antd';
import checkedIcon from 'Assets/icons/button/checked.svg';
import rejectIcon from 'Assets/icons/button/reject.svg';
import xIcon from 'Assets/icons/button/x.svg';
import {
  OverviewCommonForm,
  OverviewSportForm,
} from 'Components/Forms/Common';
import { Overview as OverviewMeetingForm } from 'Components/Forms/Meeting';
import typeDescHelper from 'Components/TaskTable/type.desc.helper';
import React, { useEffect, useState } from 'react';
import Loadable from 'react-loadable';
import { useHistory, useLocation } from 'react-router';
import { taskAPI } from 'Services/task';
import { TaskDetail } from 'Services/task/task.interface';
import { u } from 'Services/user';
import { StaffPermissionType } from 'Services/user/staff.interface';
import staffGroupHelper from 'Services/user/staffGroupHelper';
import { CustomBrakeLine, detailStyle, mainStyle } from './helper';
import { initTask } from './init.state';
import useCanReject from './useCanReject';

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
  loader: () => import('Components/StateCard/StateCardIconColor'),
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
const ConfirmModal = Loadable({
  loader: () => import('Components/ConfirmModal'),
  loading: () => null,
});

// Custom Components
const RejectButton: React.FC<{ onClick?: () => void }> = props => (
  <div style={{ height: '45px' }}>
    <Button
      style={{ backgroundColor: 'white', height: '30px' }}
      fontColor="#FF682B"
      fontSize={14}
      padding={'0px'}
      onClick={props.onClick}
    >
      <img style={{ paddingRight: '6px' }} src={rejectIcon} />
      ตีกลับ
    </Button>
  </div>
);

// constant
const MAX_LEVEL_FORWARD = 2;

const TaskPage: React.FC = () => {
  const location = useLocation();
  const taskId = location.pathname.split('/')[3];
  const history = useHistory();

  // modal states
  const [dropModal, setDropModal] = useState(false);
  const [acceptModal, setAcceptModel] = useState(false);
  const [forwardModal, setForwardModal] = useState(false);
  const [rejectModal, setRejectModal] = useState(false);

  const [task, setTask] = useState<TaskDetail>(initTask);
  const forms = task.forms;
  const area = task.area;
  const [drop, setDrop] = useState(true);
  const [accepted, setAccepted] = useState(true);
  const [forward, setForward] = useState(true);
  const [reject, setReject] = useState(true);

  const formInfo = (type: TaskDetail['type']) => {
    if (!forms) return null;
    if (type === 'common') {
      return <OverviewCommonForm viewOnly={true} data={{ forms, area }} />;
    }
    if (type === 'common-sport') {
      return <OverviewSportForm viewOnly={true} data={{ forms, area }} />;
    }
    if (type === 'meeting-club') {
      return (
        <OverviewMeetingForm
          buttonOffeset={false}
          viewOnly={true}
          data={{ forms, area }}
        />
      );
    }
    if (type === 'meeting-room') {
      return (
        <OverviewMeetingForm
          buttonOffeset={false}
          viewOnly={true}
          showFacility={false}
          data={{ forms, area }}
        />
      );
    }
    return null;
  };

  function onBack() {
    return history.goBack();
  }

  // modal handler
  function onActionDropModal(desc?: string) {
    taskAPI
      .cancleTaskByStaff(taskId, desc)
      .then(() => history.goBack())
      .catch(err => message.error(String(err)));
  }

  function onAcceptDropModal(desc?: string) {
    taskAPI
      .acceptTaskByStaff(taskId, desc)
      .then(() => history.goBack())
      .catch(err => message.error(String(err)));
  }

  function onForwardDropModal(desc?: string) {
    taskAPI
      .forwardTaskByStaff(taskId, desc)
      .then(() => history.goBack())
      .catch(err => message.error(String(err)));
  }

  function onRejectDropModel(desc?: string) {
    taskAPI
      .rejectTaskByStaff(taskId, desc)
      .then(() => history.goBack())
      .catch(err => message.error(String(err)));
  }

  // modal states
  function onDropModal() {
    setDropModal(prev => !prev);
  }

  function onAcceptModal() {
    setAcceptModel(prev => !prev);
  }

  function onForwardModal() {
    setForwardModal(prev => !prev);
  }

  function onRejectModal() {
    setRejectModal(prev => !prev);
  }

  //   fetch task
  useEffect(() => {
    taskAPI.getTaskById(taskId).then(t => {
      if (t) {
        setTask(t);
        const lastState = t.state.slice(-1)[0];
        const alreadyDrop = lastState === 'drop';
        const alreadyAccepted = lastState === 'accept';
        const alreadyForward = lastState === 'forward';
        const canReject = useCanReject(t);

        // drop
        if (alreadyDrop) {
          setAccepted(false);
          return;
        }

        // reject
        if (canReject) {
          setReject(false);
        } else {
          setReject(true);
          setDrop(false);
          setAccepted(false);
          return;
        }

        const currentUserLevel = staffGroupHelper(
          u.GetUser().group as StaffPermissionType,
        );

        // cancle & accept
        if (!alreadyForward) {
          setDrop(alreadyDrop);
          setAccepted(alreadyAccepted);
          if (currentUserLevel >= MAX_LEVEL_FORWARD) {
            setForward(true);
          } else {
            setForward(false);
          }
          return;
        }

        // forward ** overrides cancle & accept **
        if (alreadyForward) {
          const taskLevelForward = staffGroupHelper(
            t.staff.slice(-1)[0].group,
          );

          const canNextForward = taskLevelForward < MAX_LEVEL_FORWARD;

          // when reach to max lv staff
          if (!canNextForward) {
            if (currentUserLevel === taskLevelForward) {
              setAccepted(false);
              setDrop(false);
              return;
            }
            return setForward(true);
          }

          if (taskLevelForward < currentUserLevel) {
            console.log('task < cur');
            setAccepted(false);
            setDrop(false);
            // setForward(false);
            if (currentUserLevel >= MAX_LEVEL_FORWARD) {
              setForward(true);
            } else {
              setForward(false);
            }
          } else if (taskLevelForward === currentUserLevel) {
            console.log('task === cur');
            setAccepted(false);
            setDrop(false);
            setForward(false);
          } else {
            console.log('task > cur');
            setAccepted(true);
            setDrop(true);
            setForward(true);
          }
          console.log('level', taskLevelForward, currentUserLevel);
        } else {
          setForward(true);
        }
      }
    });
  }, []);

  console.log(task);

  return (
    <StaffLayout>
      {/* Backcard */}
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

      {/* Header */}
      <Row style={{ marginTop: '24px' }} justify="center" type="flex">
        {/* header */}
        <Col span={20} style={{ ...mainStyle }}>
          <Row type="flex" justify="space-between">
            <Col span={18}>รหัสการจอง : {task._id}</Col>

            {/* reject button */}
            {!reject && (
              <Col style={{ right: 0 }} span={4}>
                <RejectButton onClick={() => setRejectModal(true)} />
              </Col>
            )}
          </Row>
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
                {task.area.building && typeDescHelper(task.type)}
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
              <b>สถานที่</b>{' '}
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

            {/* <CustomBrakeLine /> */}
            {/* extend forms */}

            <Col style={{ fontWeight: 'normal' }} span={24}>
              {formInfo(task.type)}
            </Col>

            {/* Action */}
            {
              <React.Fragment>
                {/* accept  */}
                {!accepted && (
                  <Button
                    style={{
                      width: '175px',
                      backgroundColor: '#52C41A',
                    }}
                    fontSize={16}
                    padding={4}
                    onClick={() => setAcceptModel(true)}
                  >
                    <img
                      style={{ padding: 4 }}
                      src={checkedIcon}
                      alt="checked-icon"
                    />
                    อนุมัติ
                  </Button>
                )}

                {/* forward */}
                {!forward && (
                  <Button
                    style={{
                      width: '275px',
                      backgroundColor: '#1890FF',
                    }}
                    fontSize={12}
                    padding={4}
                    onClick={() => setForwardModal(true)}
                  >
                    <img
                      style={{ padding: 4 }}
                      src={checkedIcon}
                      alt="checked-icon"
                    />
                    ส่งต่อถึง ผู้อำนวยการสำนักงานกิจการนักศึกษา
                  </Button>
                )}

                {/* drop */}
                {!drop && (
                  <Button
                    style={{
                      width: '175px',
                      backgroundColor: '#F5222D',
                    }}
                    fontSize={16}
                    padding={4}
                    onClick={() => setDropModal(true)}
                  >
                    <img style={{ padding: 4 }} src={xIcon} alt="x-icon" />
                    ไม่อนุมัติ
                  </Button>
                )}
              </React.Fragment>
            }
          </Row>
        </Col>
      </Row>

      {/* action modal */}
      <ConfirmModal
        onClick={onDropModal}
        onAction={onActionDropModal}
        type="drop"
        visible={dropModal}
      />
      <ConfirmModal
        onClick={onAcceptModal}
        onAction={onAcceptDropModal}
        type="accept"
        visible={acceptModal}
      />
      <ConfirmModal
        onClick={onForwardModal}
        onAction={onForwardDropModal}
        type="forward"
        visible={forwardModal}
      />
      <ConfirmModal
        onClick={onRejectModal}
        onAction={onRejectDropModel}
        type="reject"
        visible={rejectModal}
      />
    </StaffLayout>
  );
};

export default TaskPage;
