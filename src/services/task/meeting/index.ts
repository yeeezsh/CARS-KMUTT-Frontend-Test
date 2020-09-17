import adapter from 'Services/adapter.interface';
import { CreateTaskMeeting, CreateTaskMeetingClub } from './interface';

class TaskMeetingClassAPI {
  async createMeetingClubTask(data: CreateTaskMeetingClub): Promise<void> {
    try {
      await adapter.instance.post('/task/meeting/meeting-club', {
        ...data,
      });
      return;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
  async createMeetingClubTaskByStaff(
    data: CreateTaskMeetingClub,
  ): Promise<void> {
    try {
      await adapter.instance.post('/task/meeting/meeting-club/byStaff', {
        ...data,
      });
      return;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
  async createMeetingTask(data: CreateTaskMeeting): Promise<void> {
    try {
      await adapter.instance.post('/task/meeting/meeting-room', {
        ...data,
      });
      return;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
  async createMeetingTaskByStaff(data: CreateTaskMeeting): Promise<void> {
    try {
      await adapter.instance.post('/task/meeting/meeting-room/byStaff', {
        ...data,
      });
      return;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}

export const taskMeetingAPI = new TaskMeetingClassAPI();
