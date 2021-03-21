import adapter from 'Services/adapter';

export interface TaskUpdatePayload {
  id: string;
  form: any[];
}

class TaskFormClassAPI {
  async createCommonTask(data: any): Promise<void> {
    try {
      await adapter.instance.post('/taskForm/common', { ...data });
      return;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async updateTask(data: TaskUpdatePayload): Promise<void> {
    try {
      await adapter.instance.patch('/taskForm', { ...data });
      return;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async createSportTask(data: any): Promise<void> {
    try {
      await adapter.instance.post('/taskForm/sport', { ...data });
      return;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}

export const taskFormAPI = new TaskFormClassAPI();
