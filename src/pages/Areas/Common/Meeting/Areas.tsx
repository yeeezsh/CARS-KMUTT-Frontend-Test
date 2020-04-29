import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import Loadable from 'react-loadable';

// components
const BackCard = Loadable({
  loader: () => import('Components/BackCard'),
  loading: () => null,
});
const KanBanLayout = Loadable({
  loader: () => import('Components/Layout/Kanban'),
  loading: () => null,
});
const KanbanCard = Loadable({
  loader: () => import('Components/KanbanCard'),
  loading: () => null,
});

// styles
import BackCardStyles from 'Pages/Areas/styles/backcard';

// interfaces
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
