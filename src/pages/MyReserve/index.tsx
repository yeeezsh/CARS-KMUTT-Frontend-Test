import React, { Component } from 'react';
import Loadable from 'react-loadable';
import { Route, Switch } from 'react-router';
import { Link } from 'react-router-dom';

const PageLayout = Loadable({
  loader: () => import('../../components/Layout/Page'),
  loading: () => null,
});
const StateCard = Loadable({
  loader: () => import('../../components/StateCard'),
  loading: () => null,
});
import Outline from '../../components/Outline';
const ReservationInfo = Loadable({
  loader: () => import('../../components/ReservationInfo'),
  loading: () => null,
});

// models
import Reserve from '../../models/reserve/interface';

// helpers
import OutlineType from './helpers/outline.type';
import { r } from '../../models/reserve';

// icons
import emptyIcon from '../../assets/icons/empty.box.svg';

export default class MyReservePage extends Component<
  {
    type: 'wait' | 'history' | 'requested';
  },
  { data?: Reserve[] }
> {
  state = {
    data: [],
  };

  componentDidMount = async () => {
    StateCard.preload();
    await this.fetchData();
    ReservationInfo.preload();
    return;
  };

  requireFetch = () => {
    console.log('require fetch');
    this.fetchData();
  };

  fetchData = async () => {
    const { type } = this.props;
    const data = await r.query(type);
    return this.setState({ data });
  };

  render() {
    const { data } = this.state;
    const { type } = this.props;
    const outline = OutlineType(type);
    return (
      <PageLayout titile={'การจองของฉัน'}>
        <Outline>{outline}</Outline>
        <Switch>
          <Route path="/my/reserve/*/:id">
            <ReservationInfo onUnmount={this.requireFetch} />
          </Route>

          <Route path="/">
            {!data[0] && (
              <div
                style={{
                  marginTop: '30%',
                  textAlign: 'center',
                  fontSize: '14px',
                  color: '#979797',
                }}
              >
                <img src={emptyIcon} alt="empty icon" />
                <p>ไม่มีข้อมูลการจอง</p>
              </div>
            )}
            {data[0] &&
              data.map((e: Reserve, i) => {
                const { name, reserve } = e;
                return (
                  <Link key={i + type} to={`/my/reserve/${type}/${e._id}`}>
                    <StateCard name={name} reserve={reserve} />
                  </Link>
                );
              })}
          </Route>
        </Switch>
      </PageLayout>
    );
  }
}
