import { Task, TaskType } from 'Services/task/task.interface';

export default (type?: Task['type']) => {
  switch (type) {
    case TaskType.common:
      return 'พื้นที่ส่วนกลาง';
    case TaskType.commonSport:
      return 'พื้นที่ส่วนกลางกีฬา';
    case TaskType.sport:
      return 'สนามกีฬา';
    case TaskType.meetingRoom:
      return 'ห้องประชุม';
    case TaskType.meetingClub:
      return 'ห้องกิจกรรม';
    default:
      'ไม่ระบุ';
  }
};
