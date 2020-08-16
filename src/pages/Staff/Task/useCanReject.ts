import {
  TaskDetail,
  TaskStateType,
  TaskType,
} from 'Services/task/task.interface';

function useCanReject(task: TaskDetail): boolean {
  // when empty
  if (!task) return false;

  const allowType: TaskType[] = [TaskType.common, TaskType.commonSport];
  if (task.type && !allowType.includes(task.type)) return false;

  const alreadyRejected = task.state.slice(-1)[0] === TaskStateType.reject;
  if (alreadyRejected) return false;

  // already drop
  if (task.state.slice(-1)[0] === TaskStateType.drop) return false;

  return true;
}

export default useCanReject;
