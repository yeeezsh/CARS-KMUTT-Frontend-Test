import { Drawer as DrawerType } from 'Models/drawer/interface';
import {
  basketballIcon,
  checkedIcon,
  docsIcon,
  footballareaIcon,
  homeIcon,
  ticketIcon,
  timeIcon,
} from './icon';

const menu: DrawerType[] = [
  {
    key: '1',
    label: ['หน้าหลัก'],
    icon: homeIcon,
    link: '/',
  },
  {
    key: '2',
    label: ['จองสนามกีฬา'],
    icon: basketballIcon,
    link: '/reserve/sport/category',
  },
  {
    key: '3',
    label: ['จองพื้นที่จัดกิจกรรม /ห้องประชุม'],
    icon: footballareaIcon,
    link: '/reserve/area/category',
  },
  {
    key: '4',
    label: ['การจองของฉัน'],
    icon: ticketIcon,
    sub: [
      {
        key: '1',
        label: ['กำลังดำเนินการ'],
        icon: docsIcon,
        link: '/my/reserve/wait',
      },
      {
        key: '2',
        label: ['รีเควสที่ต้องยืนยัน'],
        icon: checkedIcon,
        link: '/my/reserve/requested',
      },
      {
        key: '3',
        label: ['ประวัติการจอง'],
        icon: timeIcon,
        link: '/my/reserve/history',
      },
    ],
  },
];

export default menu;
