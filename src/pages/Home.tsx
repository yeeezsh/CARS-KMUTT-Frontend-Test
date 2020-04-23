import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loadable from 'react-loadable';

const HomeMenu = Loadable({
  loader: () => import('Components/KanbanCard'),
  loading: () => null,
});
const HomeLayout = Loadable({
  loader: () => import('Components/Layout/Home'),
  loading: () => null,
});

import { taskAPI } from 'Models/task';
import { TaskLastCard } from 'Models/task/task.interface';

type StateTypes = {
  lastCard: TaskLastCard | undefined;
  needAction: boolean;
};

type PropsTypes = {
  owner: string;
};

class Home extends Component<PropsTypes, StateTypes> {
  constructor(props: PropsTypes) {
    super(props);
    this.state = { lastCard: undefined, needAction: false };
  }

  componentDidMount = async () => {
    HomeMenu.preload();
    HomeLayout.preload();

    const lastCard = await taskAPI.getLastTask();
    const curState = lastCard?.state.slice(-1)[0];
    const firstRequestor = lastCard?.owner;
    const { owner } = this.props;

    const needAction =
      curState === 'requested' && owner !== firstRequestor;

    return this.setState({ lastCard, needAction });
  };
  render() {
    const { lastCard, needAction } = this.state;
    return (
      <HomeLayout lastCard={lastCard}>
        <HomeMenu needActions={needAction ? ['4'] : []} />
      </HomeLayout>
    );
  }
}

const mapStateToProps = (rootReducers: any) => {
  const { UserReducers } = rootReducers;
  return {
    owner: UserReducers.username,
  };
};

export default connect<PropsTypes>(mapStateToProps)(Home);
