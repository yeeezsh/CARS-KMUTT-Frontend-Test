import { TaskDetail } from 'Models/task/task.interface';
import moment from 'moment';

export const initTask: TaskDetail = {
  _id: '',
  staff: [],
  requestor: [],
  reserve: [],
  state: [],
  area: {
    _id: '',
    name: '',
    label: '',
    type: '',
  },
  building: {
    _id: '',
    name: '',
    label: '',
    type: '',
  },
  cancle: false,
  desc: [],
  createAt: moment(),
  updateAt: moment(),
};
