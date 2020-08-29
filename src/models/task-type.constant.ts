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
  {
    color: TaskBadgeColor.orange,
    label: 'ส่วนกลาง',
    type: TaskType.common,
  },
  {
    color: TaskBadgeColor.blue,
    label: 'ส่วนกลาง (กีฬา)',
    type: TaskType.commonSport,
  },
  { color: TaskBadgeColor.purple, label: 'กีฬา', type: TaskType.sport },
  {
    color: TaskBadgeColor.yellow,
    label: 'ห้องชมรม',
    type: TaskType.meetingClub,
  },
  {
    color: TaskBadgeColor.green,
    label: 'ห้องประชุม',
    type: TaskType.meetingRoom,
  },
];

export default (type: TaskType): TaskBadgeInterface => {
  return TASK_TYPE_BADGE.find(t => t.type === type) as TaskBadgeInterface;
};
