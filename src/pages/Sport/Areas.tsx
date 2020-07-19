import { sport } from 'Models/area/sport';
import Menu from 'Models/menu/interface';
import React, { Component } from 'react';
import Loadable from 'react-loadable';

const KanBanLayout = Loadable({
  loader: () => import('Components/Layout/Kanban'),
  loading: () => null,
});
const KanbanCard = Loadable({
  loader: () => import('Components/KanbanCard'),
  loading: () => null,
});

export default class Areas extends Component<
  {},
  {
    category: Menu[];
  }
> {
  state = {
    category: [],
  };
  async componentDidMount() {
    const data = await sport.getAreas();
    const categoryMenu = data.map(e => {
      return {
        ...e,
        setting: {
          center: true,
          iconSize: 70,
          labelColor: '#666666',
        },
      };
    });
    return this.setState({ category: categoryMenu });
  }
  render() {
    return (
      <KanBanLayout title={'จองสนามกีฬา'} outline={'เลือกประเภทกีฬา'}>
        <KanbanCard menu={this.state.category} />
      </KanBanLayout>
    );
  }
}
