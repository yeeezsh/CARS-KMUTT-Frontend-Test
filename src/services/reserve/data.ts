import Reserve, { ReserveState } from './interface';
import moment from 'moment';

export const query = (type: ReserveState) => {
  return type;
};

// mockup DEPRECATED
export const data = (): Reserve[] => {
  return [
    {
      _id: '1',
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
      createAt: moment(),
    },
    {
      _id: '2',
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
      createAt: moment(),
    },
  ];
};
