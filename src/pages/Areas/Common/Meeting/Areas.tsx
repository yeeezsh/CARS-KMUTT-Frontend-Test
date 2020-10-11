import Menu from 'Models/kanbanCard/interface';
import BackCardStyles from 'Pages/Areas/styles/backcard';
import React, { useEffect, useState } from 'react';
import Loadable from 'react-loadable';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { areaCommonService } from 'Services/area/common/area.common.service';
import { setFormCurrentIndex } from 'Store/reducers/areaForm/actions';
const BackCard = Loadable({
  loader: () => import('Components/BackCard'),
  loading: () => null,
});
const KanBanLayout = Loadable({
  loader: () => import('Components/Layout/KanbanLayout'),
  loading: () => null,
});
const KanbanCard = Loadable({
  loader: () => import('Components/KanbanCard/KanbanCard'),
  loading: () => null,
});

const Types: React.FC = () => {
  const [areas, setAreas] = useState<Menu[]>([]);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    areaCommonService.getMeeting().then(a => {
      console.log('common area api', a);
      setAreas(a);
    });

    // clear form index state
    dispatch(setFormCurrentIndex(0));
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
