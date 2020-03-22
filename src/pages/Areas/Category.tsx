import React from 'react';
import KanBanLayout from 'Components/Layout/Kanban';
import KanbanCard from 'Components/KanbanCard';
import Menu from 'Models/menu/interface';

import sportAreaIcon from 'Assets/icons/area/sport.svg';
import meetingAreaIcon from 'Assets/icons/area/meeting.svg';

const CategoryPage: React.FC = () => {
  const menu: Menu[] = [
    {
      key: 'sport',
      label: ['พื้นที่ส่วนกลาง', 'Common Area'],
      icon: sportAreaIcon,
    },
    {
      key: 'meeting',
      label: ['ห้องประชุม', 'Conference Room'],
      icon: meetingAreaIcon,
    },
  ].map(e => ({
    ...e,
    setting: {
      center: true,
      iconSize: 70,
      labelColor: '#666666',
    },
  }));

  return (
    <KanBanLayout
      title="จองพื้นที่จัดกิจกรรม / ห้องประชุม"
      outline="เลือกประเภทสถานที่"
    >
      <KanbanCard menu={menu} />
    </KanBanLayout>
  );
};

export default CategoryPage;
