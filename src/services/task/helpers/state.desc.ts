import { ReserveState, ReserveStateDesc } from '../../reserve/interface';
import { TaskStateType } from '../task.interface';

export default (state: ReserveState): ReserveStateDesc => {
  switch (state) {
    case TaskStateType.accept:
      return 'ได้รับการอนุมัติ';
    case TaskStateType.approve:
      return 'ได้รับการอนุมัติ';
    case TaskStateType.reject:
      return 'ตีกลับ';
    case TaskStateType.wait:
      return 'รอการยืนยัน';
    case TaskStateType.resend:
      return 'รอการตอบกลับ';
    case TaskStateType.forward:
      return 'รอการส่งต่อ';
    case TaskStateType.requested:
      return 'รอการยืนยันจากเพื่อน';
    case TaskStateType.drop:
      return 'ยกเลิก';
    default:
      return 'undefined';
  }
};
