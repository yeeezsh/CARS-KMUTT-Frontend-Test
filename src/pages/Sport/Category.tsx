import React from 'react';
import KanBanLayout from '../../components/Layout/Kanban';
import KanbanCard from '../../components/KanbanCard';

// models
import { category } from '../../models/area/sport';
const menu = category;

export default function Category() {
  // map setting
  const categoryMenu = menu.map(e => {
    return {
      ...e,
      setting: {
        center: true,
        iconSize: 70,
        labelColor: '#666666',
      },
    };
  });
  return (
    <KanBanLayout title={'จองสนามกีฬา'} outline={'เลือกประเภทกีฬา'}>
      <KanbanCard menu={categoryMenu} />
    </KanBanLayout>
  );
}
