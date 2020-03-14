import User from '../../../models/user/interface';
import { QuotaType } from '../../../models/user/quota.interface';
import { SET_USER, DELETE_USER } from './actions';

export type UserStore = User & QuotaType;

const initialState: UserStore = {
  _id: '',
  username: '',
  studentId: '',
  email: '',
  permission: '',
  n: 0,
};

export const UserReducers = (
  state: UserStore = initialState,
  action: any,
) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...action.user,
      };
    case DELETE_USER:
      return {
        ...state,
        ...initialState,
      };

    default:
      return state;
  }
};
