import { TaskDetail, TaskType } from 'Services/task/task.interface';

function useCanReject(task: TaskDetail): boolean {
  // when empty
  if (!task) return false;

  const allowType: TaskType[] = [TaskType.common, TaskType.commonSport];
  if (task.type && !allowType.includes(task.type)) return false;

  const alreadyRejected = task.state.slice(-1)[0] === 'reject';
  if (alreadyRejected) return false;

  if (task.type === 'sport') return false;
  // already drop
  if (task.state.slice(-1)[0] === 'drop') return false;

  return true;
}

export default useCanReject;
