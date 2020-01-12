import React, { Component } from 'react';

import PageLayout from '../../components/Layout/Page';
import StateCard from '../../components/StateCard';
import Outline from '../../components/Outline';

export default class MyReservePage extends Component {
  render() {
    return (
      <PageLayout titile={'การจองของฉัน'}>
        <Outline>ประวัติการจอง</Outline>
      </PageLayout>
    );
  }
}
