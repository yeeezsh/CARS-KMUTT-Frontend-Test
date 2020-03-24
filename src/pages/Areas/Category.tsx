import React from 'react';
import KanBanLayout from 'Components/Layout/Kanban';
import KanbanCard from 'Components/KanbanCard';
import Menu from 'Models/menu/interface';

import commmonAreaIcon from 'Assets/icons/area/sport.svg';
import meetingAreaIcon from 'Assets/icons/area/meeting.svg';

const CategoryPage: React.FC = () => {
  const menu: Menu[] = [
    {
      key: 'common',
      label: ['พื้นที่ส่วนกลาง', 'Common Area'],
      icon: commmonAreaIcon,
      link: '/reserve/area/common',
    },
    {
      key: 'meeting',
      label: ['ห้องประชุม', 'Conference Room'],
      icon: meetingAreaIcon,
      link: '/reserve/area/meeting',
    },
  ].map(e => ({
    ...e,
    style: 'center',
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
