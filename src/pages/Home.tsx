import React from 'react';
import Loadable from 'react-loadable';

import HomeLayout from '../components/Layout/Home';

const HomeMenu = Loadable({
  loader: () => import('../components/KanbanCard'),
  loading: () => null,
});

const Home: React.FunctionComponent = () => {
  return (
    <HomeLayout>
      <HomeMenu />
    </HomeLayout>
  );
};
export default Home;
