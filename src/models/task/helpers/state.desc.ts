import { ReserveState, ReserveStateDesc } from '../../reserve/interface';

export default (state: ReserveState): ReserveStateDesc => {
  // console.log('wowowowowow', state);
  switch (state) {
    case 'accept':
      return 'ได้รับการอนุมัติ';
    case 'approve':
      return 'ได้รับการอนุมัติ';
    case 'reject':
      return 'ไม่ได้รับการอนุมัติ';
    case 'wait':
      return 'รอการยืนยัน';
    case 'requested':
      return 'รอการยืนยันจากเพื่อน';
    default:
      return 'undefined';
  }
};
