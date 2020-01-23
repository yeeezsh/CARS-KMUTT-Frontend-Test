import React, { Component } from 'react';
import { category, Query } from '../../models/area/sport';
import KanBanLayout from '../../components/Layout/Kanban';
import KanbanCard from '../../components/KanbanCard';
import Menu from '../../models/menu/interface';

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
    const data = await Query.areas();
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
