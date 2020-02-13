import React, { Component } from 'react';
import Loadable from 'react-loadable';

const HomeMenu = Loadable({
  loader: () => import('../components/KanbanCard'),
  loading: () => null,
});
const HomeLayout = Loadable({
  loader: () => import('../components/Layout/Home'),
  loading: () => null,
});

import { task } from '../models/task';
import { Task } from '../models/task/task.interface';

export default class Home extends Component<
  {},
  {
    lastCard: Task | undefined;
    needAction: boolean;
  }
> {
  constructor(props: Record<string, any>) {
    super(props);
    this.state = { lastCard: undefined, needAction: false };
  }

  componentDidMount = async () => {
    HomeMenu.preload();
    HomeLayout.preload();
    const lastCard = await task.getLastTask();
    const needAction = lastCard?.state.slice(-1)[0] === 'requested';

    return this.setState({ lastCard, needAction });
  };
  render() {
    const { lastCard } = this.state;
    return (
      <HomeLayout lastCard={lastCard}>
        <HomeMenu />
      </HomeLayout>
    );
  }
}
