import React, { Component } from 'react';

import PageLayout from '../../components/Layout/Page';
import StateCard from '../../components/StateCard';
import Outline from '../../components/Outline';

import Reserve from '../../models/reserve/interface';

import { data as Data } from '../../models/reserve/data';

// helpers
import OutlineType from './helpers/outline.type';

export default class MyReservePage extends Component<
  { type: 'wait' | 'history' | 'request' },
  {
    type: string;
    outline: string;
    data: Reserve[];
  }
> {
  state = { type: '', outline: '', data: [] };

  componentDidMount = () => {
    const { type } = this.props;
    const outline = OutlineType(type);
    const data = Data();
    return this.setState({ type, outline, data });
  };
  render() {
    console.log('my reserve', this.state.data);
    const { outline, data } = this.state;
    return (
      <PageLayout titile={'การจองของฉัน'}>
        <Outline>{outline}</Outline>
        {/* <StateCard /> */}
        {data &&
          data.map((e: Reserve, i) => {
            const { name, reserve } = e;
            return <StateCard key={i} name={name} reserve={reserve} />;
          })}
      </PageLayout>
    );
  }
}
