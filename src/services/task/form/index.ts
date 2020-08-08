import i from 'Models/axios.interface';

class TaskFormClassAPI {
  async createCommonTask(data: any): Promise<void> {
    try {
      await i.instance.post('/taskForm/common', { ...data });
      return;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async createSportTask(data: any): Promise<void> {
    try {
      await i.instance.post('/taskForm/sport', { ...data });
      return;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}

export const taskFormAPI = new TaskFormClassAPI();
