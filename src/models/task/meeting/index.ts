import i from 'Models/axios.interface';
import { CreateTaskMeetingClub, CreateTaskMeeting } from './interface';

class TaskMeetingClassAPI {
  async createMeetingClubTask(data: CreateTaskMeetingClub): Promise<void> {
    try {
      await i.instance.post('/task/meeting/meeting-club', { ...data });
      return;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
  async createMeetingTask(data: CreateTaskMeeting): Promise<void> {
    try {
      await i.instance.post('/task/meeting/meeting', { ...data });
      return;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}

export const taskMeetingAPI = new TaskMeetingClassAPI();
