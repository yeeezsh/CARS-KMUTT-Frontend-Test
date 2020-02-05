interface TimeSlot {
  start?: Date;
  stop?: Date;
  allDay?: boolean;
}

export interface Requestor {
  username: string;
  confirm: boolean;
}

export interface Task {
  reserve: TimeSlot[];
  requestor: Requestor[];
  state: Array<'wait' | 'approve' | 'reject' | 'accept' | 'drop'>;
  staff?: string[];
  area: string; // required area module
  form?: string; // required form module

  cancle: boolean;
  createAt: Date;
  updateAt: Date;
}
