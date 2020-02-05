import React, { Component } from 'react';
import Loadable from 'react-loadable';

import HomeLayout from '../components/Layout/Home';

const HomeMenu = Loadable({
  loader: () => import('../components/KanbanCard'),
  loading: () => null,
});

export default class Home extends Component {
  render() {
    return (
      <HomeLayout>
        <HomeMenu />
      </HomeLayout>
    );
  }
}
