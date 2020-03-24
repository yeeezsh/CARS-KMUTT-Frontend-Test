import React from 'react';
import KanBanLayout from 'Components/Layout/Kanban';
import KanbanCard from 'Components/KanbanCard';
import { commonAreaAPI } from 'Models/area/common';

const CommonPage: React.FC = () => {
  return (
    <KanBanLayout title="จองพื้นที่ส่วนกลาง" outline="เลือกประเภทกิจกรรม">
      <KanbanCard menu={commonAreaAPI.list} />
    </KanBanLayout>
  );
};

export default CommonPage;
