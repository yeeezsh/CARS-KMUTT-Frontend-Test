import { TimeNodeServerAPI } from '../timeslot.interface';

export interface TaskMeeting {
  time: TimeNodeServerAPI[];
  area: string;
}

export interface CreateTaskMeetingClub extends TaskMeeting {
  forms: any[];
}
export type CreateTaskMeeting = TaskMeeting;
