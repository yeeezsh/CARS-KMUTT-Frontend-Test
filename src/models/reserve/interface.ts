import { Moment } from 'moment';

export interface ReserveState {
  type: 'wait' | 'reject' | 'accept' | 'request' | 'undefined';
}

export default interface Reserve {
  name?: string;
  desc: string;
  reserve?: {
    date?: Moment;
    start?: Moment;
    stop?: Moment;
    detail?: string;
    state?: {
      type?: ReserveState['type'];
      desc?: 'ได้รับการอนุมัติ' | 'ไม่ได้รับการอนุมัติ' | 'รอการยืนยันจากเพื่อน' | string;
    };
  };
}
