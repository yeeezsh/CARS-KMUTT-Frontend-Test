import { TaskStateType } from 'Services/task/task.interface';

export interface AreaAPI {
  _id: string;
  name: string;
  label?: string;
  building?: string;
}

interface TimeSlot {
  start?: Date;
  stop?: Date;
  allDay?: boolean;
}

export interface RequestorAPI {
  username: string;
  confirm: boolean;
}

export interface TaskAPI {
  _id: string;
  reserve: TimeSlot[];
  requestor: RequestorAPI[];
  state: TaskStateType[];
  // staff?: Staff[];
  area: AreaAPI;
  forms?: any;

  cancle: boolean;
  createAt: Date;
  updateAt: Date;
}
