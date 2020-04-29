import {
  footballIcon,
  badmintonIcon,
  basketballIcon,
  tennisIcon,
  volleyballIcon,
} from '../icon.import';

// interfaces
import Menu from 'Models/menu/interface';

const data: Menu[] = [
  {
    key: '1',
    label: ['ฟุตบอล', 'football'],
    icon: footballIcon,
    link: '/reserve/sport/1',
    state: {
      label: ['ฟุตบอล', 'football'],
    },
    query: { name: 'football' },
  },
  {
    key: '2',
    label: ['แบดมินตัน', 'badminton'],
    icon: badmintonIcon,
    link: '/reserve/sport/1',
    state: {
      label: ['แบดมินตัน', 'badminton'],
    },
    query: { name: 'badminton' },
  },
  {
    key: '3',
    label: ['บาสเก็ตบอล', 'basketball'],
    icon: basketballIcon,
  },
  {
    key: '4',
    label: ['เทนนิส', 'tennis'],
    icon: tennisIcon,
  },
  {
    key: '5',
    label: ['วอลเลย์บอล', 'volleyball'],
    icon: volleyballIcon,
  },
];

export default data;
