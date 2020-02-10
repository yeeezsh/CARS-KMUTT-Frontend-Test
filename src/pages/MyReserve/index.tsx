import React, { Component } from 'react';

import PageLayout from '../../components/Layout/Page';
import StateCard from '../../components/StateCard';
import Outline from '../../components/Outline';

// models
import Reserve from '../../models/reserve/interface';

// helpers
import OutlineType from './helpers/outline.type';
import { r } from '../../models/reserve';

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
        {data &&
          data.map((e: Reserve, i) => {
            const { name, reserve } = e;
            return <StateCard key={i} name={name} reserve={reserve} />;
          })}
      </PageLayout>
    );
  }
}
