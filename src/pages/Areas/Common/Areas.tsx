import BackCard from 'Components/BackCard';
import KanbanCard from 'Components/KanbanCard';
import KanBanLayout from 'Components/Layout/Kanban';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { commonAreaAPI } from 'Services/area/common';
import Menu from 'Services/menu/interface';
import BackCardStyles from '../styles/backcard';

const CommonPage: React.FC = () => {
  const [areas, setAreas] = useState<Menu[]>([]);
  const history = useHistory();

  useEffect(() => {
    commonAreaAPI.getBuilding().then(a => {
      console.log('common area api', a);
      setAreas(a);
    });
  }, []);

  function goBack() {
    return history.push('/reserve/area/category');
  }

  return (
    <KanBanLayout title="จองพื้นที่ส่วนกลาง" outline="เลือกสถานที่">
      <div style={BackCardStyles}>
        <BackCard onClick={goBack}>เลือกประเภทสถานที่</BackCard>
      </div>
      <KanbanCard menu={areas} />
    </KanBanLayout>
  );
};

export default CommonPage;
