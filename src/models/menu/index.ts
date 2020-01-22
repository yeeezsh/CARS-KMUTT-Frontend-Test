import { basketball, footballarea, docs, check } from './icon.import';
import Menu from './interface';
const defaultMenu: Menu[] = [
  {
    key: '1',
    label: ['จองสนามกีฬา'],
    icon: basketball,
    link: '/reserve/sport/category',
    setting: {
      backgroundColor: '#FF682B',
    },
  },
  {
    key: '2',
    label: [
      `
          จองพื้นจัดกิจกรรม
          / ห้องประชุม`,
    ],
    icon: footballarea,
    setting: {
      backgroundColor: '#1890FF',
      iconSize: 50,
    },
  },
  {
    key: '3',
    label: ['กำลังดำเนินการ'],
    icon: docs,
    link: '/my/reserve/wait',
    setting: {
      labelColor: '#666666',
    },
  },
  {
    key: '4',
    label: ['รีเควสที่ต้องยืนยัน'],
    icon: check,
    link: '/my/reserve/request',
    setting: {
      labelColor: '#666666',
    },
  },
];
export default defaultMenu;
