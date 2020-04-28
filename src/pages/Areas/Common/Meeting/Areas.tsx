import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router';
import Loadable from 'react-loadable';

import BackCard from 'Components/BackCard';
import KanBanLayout from 'Components/Layout/Kanban';
import KanbanCard from 'Components/KanbanCard';
import BackCardStyles from 'Pages/Areas/styles/backcard';
import Menu from 'Models/menu/interface';
import { commonAreaAPI } from 'Models/area/common';

const Types: React.FC = () => {
  const [areas, setAreas] = useState<Menu[]>([]);
  const history = useHistory();

  useEffect(() => {
    commonAreaAPI.getMeeting().then(a => {
      console.log('common area api', a);
      setAreas(a);
    });
  }, []);

  function goBack() {
    return history.push('/reserve/area/category');
  }
  return (
    <KanBanLayout title="จองห้องประชุม" outline="เลือกสถานที่">
      <div style={BackCardStyles}>
        <BackCard onClick={goBack}>เลือกประเภทสถานที่</BackCard>
      </div>
      <KanbanCard menu={areas} />
    </KanBanLayout>
  );
};

export default Types;
