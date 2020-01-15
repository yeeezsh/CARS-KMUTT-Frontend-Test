export default () => null;

import instance from './axios.interface';
const login = (type: 'staff' | 'requestor', data: { username: string; password: string }) => {
  let url = '/users/auth/requestor';
  if (type === 'staff') url = '/users/auth/staff';
  return instance.post(url, data);
};

const RequestorLogin = async (
  username: string,
  password: string,
): Promise<{ access_token: string; Authorization: string }> => {
  const res = (await login('requestor', { username, password })).data;
  return res;
};

export { RequestorLogin };
