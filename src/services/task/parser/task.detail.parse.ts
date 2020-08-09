import moment from 'moment';
import { TaskDetail, TaskDetailAPI } from '../task.interface';

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
  desc:
    data.desc && data.desc?.length != 0
      ? data.desc?.map(e => ({ ...e, createAt: moment(e.createAt) }))
      : [],
});
