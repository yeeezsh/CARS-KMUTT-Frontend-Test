import adapter from 'Services/adapter.interface';

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
