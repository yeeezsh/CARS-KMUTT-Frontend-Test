import { TaskDetail } from 'Services/task/task.interface';

function useRejectTask(task: TaskDetail): boolean {
  // when empty
  if (!task) return false;

  if (task.type === 'sport') return false;
  if (task.state.slice(-1)[0] === 'drop') return false;
  return true;
}

export default useRejectTask;
