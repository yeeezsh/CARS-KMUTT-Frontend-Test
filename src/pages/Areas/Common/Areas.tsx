import React, { useState, useEffect } from 'react';
import KanBanLayout from 'Components/Layout/Kanban';
import KanbanCard from 'Components/KanbanCard';
import { commonAreaAPI } from 'Models/area/common';
import Menu from 'Models/menu/interface';
import BackCardStyles from '../styles/backcard';
import { useHistory } from 'react-router';
import BackCard from 'Components/BackCard';

const CommonPage: React.FC = () => {
  const [areas, setAreas] = useState<Menu[]>([]);
  const history = useHistory();

  useEffect(() => {
    commonAreaAPI.getBuilding().then(a => setAreas(a));
  }, []);
  return (
    <KanBanLayout title="จองพื้นที่ส่วนกลาง" outline="เลือกสถานที่">
      <div style={BackCardStyles}>
        <BackCard onClick={() => history.goBack()}>
          เลือกประเภทสถานที่
        </BackCard>
      </div>
      <KanbanCard menu={areas} />
    </KanBanLayout>
  );
};

export default CommonPage;
