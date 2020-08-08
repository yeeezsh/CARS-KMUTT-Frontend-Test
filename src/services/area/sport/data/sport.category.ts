// interfaces
import Menu from 'Services/menu/interface';
import {
  badmintonIcon,
  basketballIcon,
  footballIcon,
  tennisIcon,
  volleyballIcon,
} from '../icon.import';

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
    query: { name: 'basketball' },
  },
  {
    key: '4',
    label: ['เทนนิส', 'tennis'],
    icon: tennisIcon,
    query: { name: 'tennis' },
  },
  {
    key: '5',
    label: ['วอลเลย์บอล', 'volleyball'],
    icon: volleyballIcon,
    query: { name: 'volleyball' },
  },
];

export default data;
