import instance from './axios.interface';
import User from './interface';
import i from '../axios.interface';

const SaveCredential = (data: User) => {
  try {
    const duplicated = localStorage.getItem('user');
    if (duplicated) localStorage.removeItem('user');
    localStorage.setItem('user', JSON.stringify(data));
    i.addToken(data.Authorization);
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

const DeleteCredential = () => {
  localStorage.removeItem('user');
  i.removeToken();
  return;
};

const loginAdapter = (type: 'staff' | 'requestor', data: { username: string; password: string }) => {
  let url = '/users/auth/requestor';
  if (type === 'staff') url = '/users/auth/staff';
  return instance.post(url, data);
};

const RequestorLogin = async (
  username: string,
  password: string,
): Promise<{ access_token?: string; Authorization?: string; auth: boolean }> => {
  try {
    const res = (await loginAdapter('requestor', { username, password })).data;
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

const UserLogout = () => DeleteCredential();
const GetUser = (): User => {
  const data = localStorage.getItem('user');
  if (!data) throw Error('no user data please login');
  return JSON.parse(data);
};

const GetUserToken = (): User['Authorization'] => {
  const data = localStorage.getItem('user');
  if (!data) throw Error('no user data please login');
  const parse: User = JSON.parse(data);
  return parse.Authorization;
};

export { RequestorLogin, UserLogout, GetUser, GetUserToken };
