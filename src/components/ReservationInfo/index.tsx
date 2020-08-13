import { Col, Row } from 'antd';
import emptyIcon from 'Assets/icons/empty.box.svg';
import {
  OverviewCommonForm,
  OverviewSportForm,
} from 'Components/Forms/Common';
import { Overview as OverviewMeetingForm } from 'Components/Forms/Meeting';
import Loading from 'Components/Loading';
import { ButtonBackgroundColor } from 'Models/button/button.bg';
import moment from 'moment';
import React, { Component } from 'react';
import Loadble from 'react-loadable';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';
import { taskAPI } from 'Services/task';
import { TaskDetail } from 'Services/task/task.interface';
import { RootReducersType } from 'Store/reducers';
import styles from './styles.module.css';

const ActionModal = Loadble({
  loader: () => import('./Modal'),
  loading: () => null,
});
const Outline = Loadble({
  loader: () => import('Components/Outline'),
  loading: () => null,
});
const Badge = Loadble({
  loader: () => import('Components/Badge'),
  loading: () => null,
});
const StateCardIconColor = Loadble({
  loader: () => import('Components/StateCard/StateCardIconColor'),
  loading: () => null,
});
const BreakingLine = Loadble({
  loader: () => import('Components/BreakingLine'),
  loading: () => null,
});
const Button = Loadble({
  loader: () => import('Components/Button'),
  loading: () => null,
});
const UsersReserveList = Loadble({
  loader: () => import('Components/UsersReserveList'),
  loading: () => null,
});
const ReservationMessage = Loadble({
  loader: () => import('./ReservationMessage'),
  loading: () => null,
});

// custom components
const CenterIconLayout: React.FC = props => (
  <div
    style={{
      marginTop: '30%',
      textAlign: 'center',
      fontSize: '14px',
      color: '#979797',
    }}
  >
    {props.children}
  </div>
);

// const initState
const MODAL_REJECT_MSG = 'ท่านต้องการยกเลิกรีเควส';
type PropTypes = RouteComponentProps & {
  onUnmount?: () => void;
  username: string;
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
    forms?: any;
    type?: TaskDetail['type'];
    comments: TaskDetail['desc'];
    noTask: boolean;
  }
> {
  constructor(props: PropTypes) {
    super(props);
    this.state = {
      reserve: [],
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
      comments: [],
      noTask: true,
    };
  }

  goBack = () => {
    const { goBack } = this.props.history;
    return goBack();
  };

  onModal = () => {
    return this.setState(prevState => ({ modal: !prevState.modal }));
  };

  onModalAction = (confirmAction: boolean) => {
    const { owner, _id } = this.state;
    const { goBack } = this.props.history;
    const cancle = owner && confirmAction;
    if (cancle)
      taskAPI
        .cancleTaskById(_id)
        .then(() => this.setState({ modal: false }, () => goBack()));
    else if (confirmAction)
      // may be on confirm requsted
      taskAPI
        .confirmTaskSportById(_id)
        .then(() => this.setState({ modal: false }, () => goBack()));

    console.log('owner canle', cancle, confirmAction);
    return this.setState({ modal: false });
  };

  componentDidMount = async () => {
    const { match, username } = this.props;
    const params: any = match.params;
    const id = params.id;
    if (!id) throw new Error('invalid id');

    const data = await taskAPI.getTaskById(id);
    console.log('data ja', data);

    if (!data) {
      this.setState({ loading: false, noTask: true });
      return;
    }

    const owner =
      username === (data && data.requestor && data.requestor[0].username);
    const ownConfirm =
      data?.requestor.filter(e => e.username === username)[0].confirm ||
      false;

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
      forms: data.forms,
      type: data.type,
      comments: data.desc,
      noTask: false,
    });
  };

  componentWillUnmount = () => {
    const { onUnmount } = this.props;
    return onUnmount && onUnmount();
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
      forms,
      type,
    } = this.state;

    const modalMsg = owner ? MODAL_REJECT_MSG : undefined;
    const formInfo = (type: TaskDetail['type']) => {
      console.log('form type', type);
      if (!forms) return null;
      if (type === 'common') {
        return (
          <OverviewCommonForm viewOnly={true} data={{ forms, area }} />
        );
      }
      if (type === 'common-sport') {
        return (
          <OverviewSportForm viewOnly={true} data={{ forms, area }} />
        );
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

    const ActionBtn = () => {
      if (state === 'reject') {
        return (
          <React.Fragment>
            <Col span={7}>
              <Button onClick={this.goBack}>ย้อนกลับ</Button>
            </Col>
            <Col span={7}>
              <Button
                style={{ backgroundColor: ButtonBackgroundColor.Red }}
                onClick={this.onModal}
              >
                ยกเลิก
              </Button>
            </Col>
            <Col span={7}>
              <Button
                style={{ backgroundColor: ButtonBackgroundColor.Blue }}
                // onClick={this.onModal}
              >
                แก้ไข
              </Button>
            </Col>
          </React.Fragment>
        );
      } else if (
        owner &&
        !cancle &&
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
                style={{ backgroundColor: ButtonBackgroundColor.Grey }}
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
                style={{ backgroundColor: ButtonBackgroundColor.Blue }}
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

    const DataContainer = (): JSX.Element => {
      return (
        <>
          {this.state.comments.map((e, i) => (
            <ReservationMessage key={i} msg={e.msg} date={e.createAt} />
          ))}

          <Col span={24} className={styles.overview}>
            <Outline className={styles.header}>ข้อมูลการจอง</Outline>

            <Row type="flex" justify="start">
              <Col>
                <Badge>
                  <span className={styles.statusBadge}>สถานะการจอง</span>
                </Badge>
              </Col>
              <Col style={{ marginLeft: '8px' }}>
                <div className={styles.status}>
                  <StateCardIconColor type={state} />
                </div>
              </Col>
            </Row>

            <BreakingLine lineSize={0.25} color="#FDE3D4" />

            <div className={styles.info}>
              <p>
                <b>สถานที่:</b> {area.label || area.name}
              </p>
              <p>
                <b>วันที่จอง:</b>{' '}
                {moment(reserve[0].start).format('DD MMMM YYYY')}
              </p>
              <p>
                <b>เวลา:</b> {moment(reserve[0].start).format('HH.mm')} -{' '}
                {moment(reserve[0].stop).format('HH.mm')}
              </p>
            </div>

            <p className={styles.overviewStudentIds}>รหัสนักศึกษา</p>

            <Col
              className={styles.overviewStudentIds}
              offset={1}
              span={22}
            >
              <UsersReserveList users={requestor} />
            </Col>

            {formInfo(type)}

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
        </>
      );
    };

    return (
      <>
        {this.state.loading && (
          <CenterIconLayout>
            <Loading />
          </CenterIconLayout>
        )}

        {!this.state.noTask && DataContainer()}
        {!this.state.loading && this.state.noTask && (
          <CenterIconLayout>
            {/* Empty */}
            <img src={emptyIcon} alt="empty icon" />
            <p>ไม่มีข้อมูลการจอง</p>
          </CenterIconLayout>
        )}
      </>
    );
  }
}

const mapStateToProps = (rootReducers: RootReducersType) => {
  const { UserReducers } = rootReducers;
  return {
    username: UserReducers.username,
  };
};

export default withRouter(connect(mapStateToProps)(ReservationInfo));
