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
  state: Array<'wait' | 'approve' | 'reject' | 'accept' | 'drop' | 'requested'>;
  // staff?: Staff[];
  area: AreaAPI; // required area module
  // form?: Form; // required form module
  form?: any;

  cancle: boolean;
  createAt: Date;
  updateAt: Date;
}
