import Menu from 'Models/kanbanCard/interface';
import React, { Component } from 'react';
import Loadable from 'react-loadable';
import { areaSportService } from 'Services/area/sport/area.sport.service';

const KanBanLayout = Loadable({
  loader: () => import('Components/Layout/KanbanLayout'),
  loading: () => null,
});
const KanbanCard = Loadable({
  loader: () => import('Components/KanbanCard/KanbanCard'),
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
    const data = await areaSportService.getAreas();
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
