import React, { Component } from 'react';
import Loadable from 'react-loadable';
import { Route, Switch } from 'react-router';
import { Link } from 'react-router-dom';

import Outline from 'Components/Outline';
import Loading from 'Components/Loading';
const PageLayout = Loadable({
  loader: () => import('Components/Layout/Page'),
  loading: () => null,
});
const StateCard = Loadable({
  loader: () => import('Components/StateCard'),
  loading: () => null,
});
const ReservationInfo = Loadable({
  loader: () => import('Components/ReservationInfo'),
  loading: () => null,
});

// models & interfaces
import Reserve from 'Models/reserve/interface';
import { r } from 'Models/reserve';

// helpers
import OutlineType from './helpers/outline.type';

// icons
import emptyIcon from 'Assets/icons/empty.box.svg';

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

export default class MyReservePage extends Component<
  {
    type: 'wait' | 'history' | 'requested';
  },
  { data?: Reserve[]; loading: boolean }
> {
  state = {
    data: [],
    loading: true,
  };

  componentDidMount = async () => {
    StateCard.preload();
    this.setState({ loading: true });
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
    return this.setState({ data, loading: false });
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
            {!data[0] && !this.state.loading && (
              <CenterIconLayout>
                {/* Empty */}
                <img src={emptyIcon} alt="empty icon" />
                <p>ไม่มีข้อมูลการจอง</p>
              </CenterIconLayout>
            )}

            {/* Loading */}
            {this.state.loading && (
              <CenterIconLayout>
                <Loading />
              </CenterIconLayout>
            )}

            {/* Lists */}
            {data[0] &&
              data.map((e: Reserve, i) => {
                const { name, reserve, createAt } = e;

                return (
                  <Link key={i + type} to={`/my/reserve/${type}/${e._id}`}>
                    <StateCard
                      name={name}
                      reserve={{ ...reserve, createAt }}
                    />
                  </Link>
                );
              })}
          </Route>
        </Switch>
      </PageLayout>
    );
  }
}
