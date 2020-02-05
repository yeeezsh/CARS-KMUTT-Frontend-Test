interface TimeSlot {
  start?: Date;
  stop?: Date;
  allDay?: boolean;
}

interface Requestor {
  username: string;
  confirm: boolean;
}

interface Area {
  _id: string;
  name: string;
  label?: string;
  building?: string;
}

export interface Task {
  reserve: TimeSlot[];
  state: Array<'wait' | 'approve' | 'reject' | 'accept' | 'drop'>;
  area: Area;

  cancle: boolean;
  createAt: Date;
  updateAt: Date;
}
