import React, { Component } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { Row, Col } from 'antd';
import moment from 'moment';

import Outline from '../Outline';
import Badge from '../Badge';
import StateCardIconColor from '../StateCard/icon';
import BreakingLine from '../BreakingLine';

import { u } from '../../models/user';
import { task } from '../../models/task';
import { TaskDetail } from '../../models/task/task.interface';
import stateDesc from '../../models/task/helpers/state.desc';

import Button from '../Button';
import ActionModal from './modal';

// styles sheet
import styles from './styles.module.css';
import CheckIcon from '../../assets/icons/checked.user.svg';

// const initState
const MODAL_REJECT_MSG = 'ท่านต้องการยกเลิกรีเควส';
type PropTypes = RouteComponentProps & {
  onUnmount?: () => void;
};

class ReservationInfo extends Component<
  PropTypes,
  {
    reserve: TaskDetail['reserve'];
    state: TaskDetail['state'][0];
    area: TaskDetail['area'];
    requestor: TaskDetail['requestor'];
    loading: boolean;
    modal: boolean;
    owner: boolean;
    ownConfirm: boolean;
    _id: string;
    cancle: boolean;
  }
> {
  constructor(props: PropTypes) {
    super(props);
    this.state = {
      reserve: [{ start: undefined, stop: undefined, allDay: false }],
      state: 'drop',
      area: {
        label: '',
        name: '',
        _id: '',
      },
      requestor: [],
      loading: true,
      modal: false,
      owner: false,
      ownConfirm: false,
      _id: '',
      cancle: false,
    };
  }

  goBack = () => {
    const { goBack } = this.props.history;
    return goBack();
  };

  onModal = () => {
    return this.setState(prevState => ({ modal: !prevState.modal }));
  };

  onModalAction = (action: boolean) => {
    console.log('modal action', action);

    const { owner, _id } = this.state;
    const { goBack } = this.props.history;
    const cancle = owner && action;
    if (cancle)
      return task
        .cancleTaskById(_id)
        .then(() => this.setState({ modal: false }, () => goBack()));
    if (action)
      return task
        .confirmTaskById(_id)
        .then(() => this.setState({ modal: false }, () => goBack()));

    console.log('owner canle', cancle);
    // return this.setState({ modal: false });
  };

  componentDidMount = async () => {
    const { match } = this.props;
    const params: any = match.params;
    const id = params.id;
    if (!id) throw new Error('invalid id');
    // console.log('wowza', id);
    const username = u.GetUser().username;
    const data = await task.getTaskById(id);
    const owner = username === (data && data.requestor[0].username);
    const ownConfirm =
      data?.requestor.filter(e => e.username === username)[0].confirm ||
      false;

    console.log(data);
    console.log('owner', owner, 'ownCon', ownConfirm);
    if (!data) return;
    const state = data.state;
    return this.setState({
      _id: data._id,
      loading: false,
      reserve: data?.reserve || [],
      state: (state && state[state.length - 1]) || [],
      area: data?.area,
      requestor: data.requestor,
      owner,
      ownConfirm,
      cancle: data.cancle,
    });
  };

  componentWillUnmount = () => {
    const { onUnmount } = this.props;
    onUnmount && onUnmount();
  };

  render() {
    console.log('this', this.state);
    const {
      state,
      area,
      reserve,
      requestor,
      modal,
      ownConfirm,
      owner,
      cancle,
    } = this.state;

    const modalMsg = owner ? MODAL_REJECT_MSG : undefined;

    const ActionBtn = () => {
      if (owner && !cancle && state !== 'accept' && state !== 'drop') {
        return (
          <React.Fragment>
            <Col span={11}>
              <Button onClick={this.goBack}>ย้อนกลับ</Button>
            </Col>
            <Col span={11}>
              <Button
                style={{ backgroundColor: '#979797' }}
                onClick={this.onModal}
              >
                ยกเลิก
              </Button>
            </Col>
          </React.Fragment>
        );
      } else if (
        !owner &&
        !cancle &&
        !ownConfirm &&
        state !== 'accept' &&
        state !== 'drop'
      ) {
        return (
          <React.Fragment>
            <Col span={11}>
              <Button onClick={this.goBack}>ย้อนกลับ</Button>
            </Col>
            <Col span={11}>
              <Button
                style={{ backgroundColor: '#1890FF' }}
                onClick={this.onModal}
              >
                ยืนยัน
              </Button>
            </Col>
          </React.Fragment>
        );
      } else {
        return (
          <React.Fragment>
            <Col span={24}>
              <Button onClick={this.goBack}>ย้อนกลับ</Button>
            </Col>
          </React.Fragment>
        );
      }
    };

    return (
      <React.Fragment>
        <Col span={24} className={styles.overview}>
          <Outline className={styles.header}>ข้อมูลการจอง</Outline>
          {/* sub header */}
          <Row type="flex" justify="start">
            <Col>
              <Badge>
                <span className={styles.statusBadge}>สถานะการจอง</span>
              </Badge>
            </Col>
            <Col style={{ marginLeft: '8px' }}>
              <div className={styles.status}>
                <StateCardIconColor type={state} desc={stateDesc(state)} />
              </div>
            </Col>
          </Row>

          {/* breaking line */}
          <BreakingLine lineSize={0.25} color="#FDE3D4" />

          {/* area info */}
          <div className={styles.info}>
            <p>สถานที่: {area.label || area.name}</p>
            <p>
              วันที่จอง: {moment(reserve[0].start).format('DD MMMM YYYY')}
            </p>
            <p>
              เวลา: {moment(reserve[0].start).format('HH.mm')} -{' '}
              {moment(reserve[0].stop).format('HH.mm')}
            </p>
          </div>

          <p className={styles.overviewStudentIds}>รหัสนักศึกษา</p>

          {/* users */}
          <Col className={styles.overviewStudentIds} offset={1} span={22}>
            {/* 1) 2) */}
            {requestor &&
              requestor.map((e, i) => (
                <p className={styles.studentId} key={i}>
                  {/* {i + 1}) {e.username} */}
                  {i + 1}) {e.username}{' '}
                  {e.confirm && (
                    <img
                      className={styles.icon}
                      src={CheckIcon}
                      alt="checked icon"
                    />
                  )}
                </p>
              ))}
          </Col>

          {/* btn action */}
          <Col span={24} style={{ marginTop: '55px' }}>
            <Row type="flex" justify="space-around">
              <ActionBtn />
            </Row>
          </Col>
        </Col>
        <ActionModal
          desc={modalMsg}
          visible={modal}
          onModal={this.onModalAction}
        />
      </React.Fragment>
    );
  }
}

export default withRouter(ReservationInfo);
