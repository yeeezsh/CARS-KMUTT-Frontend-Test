import BackCard from 'Components/BackCard';
import KanbanCard from 'Components/KanbanCard/KanbanCard';
import KanBanLayout from 'Components/Layout/KanbanLayout';
import Menu from 'Models/kanbanCard/interface';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { areaCommonService } from 'Services/area/area.common/area.common.service';
import BackCardStyles from '../styles/backcard';

const AreaCommonPage: React.FC = () => {
  const [areas, setAreas] = useState<Menu[]>([]);
  const history = useHistory();

  useEffect(() => {
    areaCommonService.getBuilding().then(a => {
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

export default AreaCommonPage;
