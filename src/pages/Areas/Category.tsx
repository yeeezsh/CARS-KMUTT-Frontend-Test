import meetingAreaIcon from 'Assets/icons/area/meeting.svg';
import commmonAreaIcon from 'Assets/icons/area/sport.svg';
import KanbanCard from 'Components/KanbanCard/KanbanCard';
import KanBanLayout from 'Components/Layout/KanbanLayout';
import Menu from 'Models/kanbanCard/interface';
import React from 'react';

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
      link: '/reserve/area/meeting/areas',
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
