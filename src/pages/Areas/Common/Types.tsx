import React from 'react';
import KanBanLayout from 'Components/Layout/Kanban';
import KanbanCard from 'Components/KanbanCard';
import { useLocation, useHistory } from 'react-router';
import Menu from 'Models/menu/interface';

// assets
import activityTypeBuildingIcon from 'Assets/icons/area/building/kfc.svg';
import sportTypeBuildingIcon from 'Assets/icons/area/building/basketball-ball.svg';
import BackCard from 'Components/BackCard';
import BackCardStyles from '../styles/backcard';

const TypesPage: React.FunctionComponent = () => {
  const location = useLocation();
  const history = useHistory();
  const areaId = location.pathname.split('/')[3];

  const menu: Menu[] = [
    {
      key: '1',
      label: [`จัดกิจกรรม`],
      icon: activityTypeBuildingIcon,
      link: `/reserve/common/${areaId}/activity/1`,
      query: { name: 'kfc' },
    },
    {
      key: '2',
      label: [`แข่งขันกีฬา`],
      icon: sportTypeBuildingIcon,
      link: `/reserve/common/${areaId}/sport/1`,
      query: { name: 'park' },
    },
  ].map(e => ({ ...e, style: 'center' }));
  console.log(areaId);
  return (
    <KanBanLayout title="จองพื้นที่ส่วนกลาง" outline="เลือกประเภทกิจกรรม">
      <div style={BackCardStyles}>
        <BackCard onClick={() => history.goBack()}>เลือกสถานที่</BackCard>
      </div>
      <KanbanCard menu={menu} />
    </KanBanLayout>
  );
};

export default TypesPage;
