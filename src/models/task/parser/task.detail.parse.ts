import { TaskDetailAPI, TaskDetail } from '../task.interface';
import moment from 'moment';

export default (data: TaskDetailAPI): TaskDetail => ({
  ...data,
  reserve:
    data.reserve &&
    data.reserve.map((e: any) => ({
      ...e,
      start: moment(e.start),
      stop: moment(e.stop),
    })),
  createAt: moment(data.createAt),
  updateAt: moment(data.updateAt),
});
