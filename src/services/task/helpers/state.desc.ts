import { ReserveState, ReserveStateDesc } from '../../reserve/interface';

export default (state: ReserveState): ReserveStateDesc => {
  switch (state) {
    case 'accept':
      return 'ได้รับการอนุมัติ';
    case 'approve':
      return 'ได้รับการอนุมัติ';
    case 'reject':
      return 'ตีกลับ';
    case 'wait':
      return 'รอการยืนยัน';
    case 'forward':
      return 'รอการส่งต่อ';
    case 'requested':
      return 'รอการยืนยันจากเพื่อน';
    case 'drop':
      return 'ยกเลิก';
    default:
      return 'undefined';
  }
};
