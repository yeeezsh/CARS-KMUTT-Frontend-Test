import React, { Component } from 'react';
import Loadable from 'react-loadable';

import HomeLayout from '../components/Layout/Home';
import { task } from '../models/task';
import { Task } from '../models/task/task.interface';

const HomeMenu = Loadable({
  loader: () => import('../components/KanbanCard'),
  loading: () => null,
});

export default class Home extends Component<
  {},
  {
    lastCard: Task | undefined;
  }
> {
  state = { lastCard: undefined };

  componentDidMount = async () => {
    const data = await task.getLastTask();

    return this.setState({ lastCard: data });
  };
  render() {
    const { lastCard } = this.state;
    // console.log(lastCard?.reserve[0].start?.format('HH MM DD'));
    return (
      <HomeLayout lastCard={lastCard}>
        <HomeMenu />
      </HomeLayout>
    );
  }
}
