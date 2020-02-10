import User from './interface';
import { QuotaType } from './quota.interface';
import i from '../axios.interface';
import { store } from '../../index';
import { setUser, deleteUser } from '../../store/reducers/users/actions';

const loginAdapter = (type: 'staff' | 'requestor', data: { username: string; password: string }) => {
  let url = '/users/auth/requestor';
  if (type === 'staff') url = '/users/auth/staff';
  return i.instance.post(url, data);
};

class UserClass {
  user: User;
  constructor() {
    const data = localStorage.getItem('user');
    this.user = JSON.parse(data || '{}');
  }

  DeleteCredential = () => {
    store.dispatch(deleteUser());
    localStorage.removeItem('user');
    return;
  };

  SaveCredential = (data: User) => {
    try {
      const duplicated = localStorage.getItem('user');
      if (duplicated) localStorage.removeItem('user');
      localStorage.setItem('user', JSON.stringify(data));

      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  RequestorLogin = async (username: string, password: string): Promise<{ auth: boolean }> => {
    try {
      const res = (await loginAdapter('requestor', { username, password })).data;
      store.dispatch(setUser(res));
      this.SaveCredential(res);
      return { auth: true };
    } catch (err) {
      const status: number = err.response.status;
      if (status === 401)
        return {
          auth: false,
        };
      return {
        auth: false,
      };
    }
  };

  UserLogout = async () => {
    await i.instance.get('/users/auth/logout');
    this.DeleteCredential();
  };

  GetUser = (): User => {
    return this.user;
  };

  GetQuota = async (): Promise<QuotaType> => {
    const res = (await i.instance.get('/users/quota')).data;
    console.log('quota', res);
    return res;
  };
}

export const u = new UserClass();
