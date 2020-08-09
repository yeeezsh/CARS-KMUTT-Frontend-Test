import { TaskStaffRequested } from 'Services/task/task.staff.requested.interface';
import { STAFF_PERMISSION } from './staff.interface';

export default (taskStaff: TaskStaffRequested['group']): number => {
  const STAFF_LEVEL = STAFF_PERMISSION;
  const result = STAFF_LEVEL.findIndex(st => st === taskStaff);
  if (result === -1) throw new Error('bad staff level parsing');
  return result;
};
