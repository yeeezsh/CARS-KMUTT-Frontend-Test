export default () => null;

import instance from './axios.interface';
import User from './interface';

const SaveCredential = (data: User) => {
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

const login = (type: 'staff' | 'requestor', data: { username: string; password: string }) => {
  let url = '/users/auth/requestor';
  if (type === 'staff') url = '/users/auth/staff';
  return instance.post(url, data);
};

const RequestorLogin = async (
  username: string,
  password: string,
): Promise<{ access_token?: string; Authorization?: string; auth: boolean }> => {
  try {
    const res = (await login('requestor', { username, password })).data;
    SaveCredential(res);
    return { ...res, auth: true };
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

export { RequestorLogin };
