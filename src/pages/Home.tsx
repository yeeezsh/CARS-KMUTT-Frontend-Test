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
    needAction: boolean;
  }
> {
  constructor(props: Record<string, any>) {
    super(props);
    this.state = { lastCard: undefined, needAction: false };
  }

  componentDidMount = async () => {
    const lastCard = await task.getLastTask();
    const needAction = lastCard?.state.slice(-1)[0] === 'requested';

    return this.setState({ lastCard, needAction });
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
