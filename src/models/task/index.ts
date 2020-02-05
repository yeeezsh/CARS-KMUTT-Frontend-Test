import i from '../axios.interface';

class TaskClass {
  async getLastTask() {
    try {
      const data = (await i.instance.get('/task/last')).data;
      return data;
    } catch (err) {
      console.error(err);
      throw new Error(err);
    }
  }
}

export const task = new TaskClass();
