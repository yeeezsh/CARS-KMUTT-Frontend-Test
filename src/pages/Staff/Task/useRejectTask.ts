import { TaskDetail } from 'Services/task/task.interface';

function useRejectTask(task: TaskDetail): boolean {
  // when empty
  if (!task) return false;

  if (task.type === 'sport') return false;
  // already drop
  if (task.state.slice(-1)[0] === 'drop') return false;
  // already reject
  if (task.state.slice(-1)[0] === 'reject') return false;

  return true;
}

export default useRejectTask;
