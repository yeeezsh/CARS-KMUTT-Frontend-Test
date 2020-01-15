import Reserve, { ReserveState } from './interface';
import moment from 'moment';

export const query = (type: ReserveState['type']) => {
  return type;
};

export const data = (): Reserve[] => {
  return [
    {
      name: 'แบดมินตัน 1',
      desc: '',
      reserve: {
        date: moment(),
        start: moment().startOf('hour'),
        stop: moment()
          .startOf('hour')
          .add(1, 'hour'),
        state: {
          type: 'accept',
          desc: 'ได้รับการอนุมัติ',
        },
      },
    },
    {
      name: 'ฟุตบอล 1',
      reserve: {
        date: moment(),
        start: moment().startOf('hour'),
        stop: moment()
          .startOf('hour')
          .add(1, 'hour'),
        state: {
          type: 'wait',
          desc: 'รอการยืนยันจากเพื่อน',
        },
      },
    },
  ];
};
