import sportTypeBuildingIcon from 'Assets/icons/area/building/basketball-ball.svg';
// assets
import activityTypeBuildingIcon from 'Assets/icons/area/building/kfc.svg';
import BackCard from 'Components/BackCard';
import KanbanCard from 'Components/KanbanCard';
import KanBanLayout from 'Components/Layout/Kanban';
import React from 'react';
import { useHistory, useLocation } from 'react-router';
import Menu from 'Services/menu/interface';
import BackCardStyles from '../styles/backcard';

const TypesPage: React.FunctionComponent<{
  allowSport?: boolean;
}> = props => {
  const location = useLocation();
  const history = useHistory();
  const areaId = location.pathname.split('/')[3];

  const menu: Menu[] = [
    {
      key: '1',
      label: [`จัดกิจกรรม`],
      icon: activityTypeBuildingIcon,
      link: `/reserve/common/${areaId}/activity/1`,
    },
  ];

  const { allowSport } = props;
  if (allowSport)
    menu.push({
      key: '2',
      label: [`แข่งขันกีฬา`],
      icon: sportTypeBuildingIcon,
      link: `/reserve/common/${areaId}/sport/1`,
    });

  const mappedMenu: Menu[] = menu.map(e => ({ ...e, style: 'center' }));
  console.log(areaId);
  return (
    <KanBanLayout title="จองพื้นที่ส่วนกลาง" outline="เลือกประเภทกิจกรรม">
      <div style={BackCardStyles}>
        <BackCard onClick={() => history.push('/reserve/area/common')}>
          เลือกสถานที่
        </BackCard>
      </div>
      <KanbanCard menu={mappedMenu} />
    </KanBanLayout>
  );
};

export default TypesPage;
