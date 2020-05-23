import { Task } from 'Models/task/task.interface';

export default (type?: Task['type']) => {
  switch (type) {
    case 'common':
      return 'พื้นที่ส่วนกลาง';
    case 'common-sport':
      return 'พื้นที่ส่วนกลางกีฬา';
    case 'sport':
      return 'สนามกีฬา';
    case 'meeting-room':
      return 'ห้องประชุม';
    case 'meeting-club':
      return 'ห้องกิจกรรม';
    default:
      'ไม่ระบุ';
  }
  return 'ไม่ระบุ';
};
