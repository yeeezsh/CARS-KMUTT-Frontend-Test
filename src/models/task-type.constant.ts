import { TaskType } from 'Services/task/task.interface';

enum TaskBadgeColor {
  orange = '#FF682B',
  yellow = '#F7B731',
  purple = '#8854D0',
  blue = '#1890FF',
  green = '#20BF6B',
}

export interface TaskBadgeInterface {
  color: React.CSSProperties['color'];
  label: string;
  type: TaskType;
}
const TASK_TYPE_BADGE: TaskBadgeInterface[] = [
  { color: 'red', label: 'ส่วนกลาง', type: TaskType.common },
  { color: 'green', label: 'ส่วนกลาง (กีฬา)', type: TaskType.commonSport },
  { color: 'yellow', label: 'กีฬา', type: TaskType.sport },
  { color: 'pink', label: 'ห้องชมรม', type: TaskType.meetingClub },
  { color: 'orange', label: 'ห้องประชุม', type: TaskType.meetingRoom },
];

export default (type: TaskType): TaskBadgeInterface => {
  return TASK_TYPE_BADGE.find(t => t.type === type) as TaskBadgeInterface;
};
