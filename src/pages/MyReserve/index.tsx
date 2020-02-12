import React, { Component } from 'react';
import Loadable from 'react-loadable';

const PageLayout = Loadable({
  loader: () => import('../../components/Layout/Page'),
  loading: () => null,
});
const StateCard = Loadable({
  loader: () => import('../../components/StateCard'),
  loading: () => null,
});
import Outline from '../../components/Outline';

// models
import Reserve from '../../models/reserve/interface';

// helpers
import OutlineType from './helpers/outline.type';
import { r } from '../../models/reserve';
import { Route, Switch } from 'react-router';
import { Link } from 'react-router-dom';
import ReservationInfo from '../../components/ReservationInfo';

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
    await this.fetchData();
    return;
  };

  requireFetch = () => {
    console.log('require fetch');
    this.fetchData();
  };

  fetchData = async () => {
    const { type } = this.props;
    const data = await r.query(type);
    console.log('my reserve page mount', type);
    console.log(data);
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
            {!data[0] && <StateCard />}
            {data[0] &&
              data.map((e: Reserve, i) => {
                const { name, reserve } = e;
                return (
                  <Link key={i} to={`/my/reserve/${type}/${e._id}`}>
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
