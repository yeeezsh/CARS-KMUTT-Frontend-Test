import kfcBuildingIcon from 'Assets/icons/area/building/kfc.svg';
import parkBuildingIcon from 'Assets/icons/area/building/park.svg';
import lgBuildingIcon from 'Assets/icons/area/building/lg.svg';
import basketballBuildingIcon from 'Assets/icons/area/building/basketball.svg';

import Menu from 'Models/menu/interface';

const data: Menu[] = [
  {
    key: '1',
    label: [
      `อาคารพระจอมเกล้า
      ราชานุสรณ์ 190 ปี มจธ.
      (โรงยิม)`,
    ],
    icon: kfcBuildingIcon,
    query: { name: 'kfc' },
    allowSport: true,
  },
  {
    key: '2',
    label: [`สวนสุขภาพ`],
    icon: parkBuildingIcon,
    query: { name: 'park' },
  },
  {
    key: '3',
    label: [`Learning Garden`],
    icon: lgBuildingIcon,
    query: { name: 'lg' },
  },
  {
    key: '4',
    label: [`สนามบาสคณะวิทยาศาสตร์`],
    icon: basketballBuildingIcon,
    query: { name: 'sci-basketball' },
  },
].map(e => ({
  ...e,
  style: 'center',
  link: '/reserve/area/common/',
}));

export default data;
