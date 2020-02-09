import User from '../../../models/user/interface';
import { QuotaType } from '../../../models/user/quota.interface';

export type UserStore = User & QuotaType;

const initialState: UserStore = {
  _id: '',
  username: '',
  studentId: '',
  email: '',
  permission: 'requestor',
  n: 0,
};

export const UserReducers = (state: UserStore = initialState, action: any) => {};
