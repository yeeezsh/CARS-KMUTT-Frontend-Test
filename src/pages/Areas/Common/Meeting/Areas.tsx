import Menu from 'Models/kanbanCard/interface';
import BackCardStyles from 'Pages/Areas/styles/backcard';
import React, { useEffect, useState } from 'react';
import Loadable from 'react-loadable';
import { useHistory } from 'react-router';
import { commonAreaAPI } from 'Services/area/common';
const BackCard = Loadable({
  loader: () => import('Components/BackCard'),
  loading: () => null,
});
const KanBanLayout = Loadable({
  loader: () => import('Components/Layout/Kanban'),
  loading: () => null,
});
const KanbanCard = Loadable({
  loader: () => import('Components/KanbanCard/KanbanCard'),
  loading: () => null,
});

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
