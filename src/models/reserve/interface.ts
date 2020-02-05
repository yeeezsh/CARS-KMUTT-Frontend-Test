import { Moment } from 'moment';

export type ReserveState = 'wait' | 'approve' | 'reject' | 'accept' | 'drop' | undefined;
export type ReserveStateHistory = Array<ReserveState>;

export default interface Reserve {
  name?: string;
  desc?: string;
  reserve?: {
    date?: Moment;
    start?: Moment;
    stop?: Moment;
    detail?: string;
    state?: {
      type?: ReserveState;
      desc?: 'ได้รับการอนุมัติ' | 'ไม่ได้รับการอนุมัติ' | 'รอการยืนยันจากเพื่อน' | string;
    };
  };
}
