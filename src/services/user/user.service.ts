import { AxiosError, AxiosInstance } from 'axios';
import store from 'Store/index';
import { deleteUser, setUser } from '../../store/reducers/users/actions';
import adapter from '../adapter.interface';
import { MSG_BAD_PASSWORD, MSG_INTERNAL_ERROR } from './default.msg';
import User from './interface';
import { QuotaType } from './quota.interface';

const loginAdapter: AxiosInstance['post'] = async (
  type: 'staff' | 'requestor',
  data: { username: string; password: string },
) => {
  let url = '/users/auth/requestor';
  if (type === 'staff') url = '/users/auth/staff';
  return await adapter.instance.post(url, data);
};

export class UserService {
  user: User;
  constructor() {
    const data = localStorage.getItem('user');
    this.user = JSON.parse(data || '{}');
  }

  DeleteCredential = () => {
    localStorage.removeItem('user');
    store.dispatch(deleteUser());
    return;
  };

  SaveCredential = (data: User) => {
    try {
      this.user = data;
      store.dispatch(setUser(data));
      const duplicated = localStorage.getItem('user');
      if (duplicated) localStorage.removeItem('user');
      localStorage.setItem('user', JSON.stringify(data));
      return true;
    } catch (err) {
      return false;
    }
  };

  RestoreUser = () => {
    const user = localStorage.getItem('user');
    if (!user) throw Error('user need login');
    store.dispatch(setUser(JSON.parse(user)));
  };

  RequestorLogin = async (
    username: string,
    password: string,
  ): Promise<{ auth: boolean; msg?: string }> => {
    try {
      const data = (
        await loginAdapter('requestor', { username, password })
      ).data;
      this.SaveCredential(data);
      return { auth: true };
    } catch (err) {
      const error = err as AxiosError;
      const status = error.response?.status;
      if (status === 401)
        return {
          auth: false,
          msg: MSG_BAD_PASSWORD,
        };
      return {
        auth: false,
        msg: MSG_INTERNAL_ERROR,
      };
    }
  };

  StaffLogin = async (
    username: string,
    password: string,
  ): Promise<{ auth: boolean; msg?: string }> => {
    try {
      const res = (await loginAdapter('staff', { username, password }))
        .data;
      this.SaveCredential(res);
      return { auth: true };
    } catch (err) {
      const status: number = err.response.status;
      if (status === 401)
        return {
          auth: false,
          msg: MSG_BAD_PASSWORD,
        };
      return {
        auth: false,
        msg: MSG_INTERNAL_ERROR,
      };
    }
  };

  UserLogout = async (): Promise<void> => {
    this.user = { _id: '', username: '', group: '' };
    this.DeleteCredential();
    await adapter.instance.get('/users/auth/logout');
    return;
  };

  GetUser = (): User => {
    return this.user;
  };

  GetQuota = async (): Promise<QuotaType> => {
    const res = (await adapter.instance.get('/users/quota')).data;
    console.log('quota', res);
    return res;
  };
}

export const userService = new UserService();
