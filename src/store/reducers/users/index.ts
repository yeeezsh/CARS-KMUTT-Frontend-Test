import User from '../../../models/user/interface';
import { QuotaType } from '../../../models/user/quota.interface';
import { SET_USER, DELETE_USER } from './actions';
import { u } from '../../../models/user';

export type UserStore = User & QuotaType;

const initialState: UserStore = {
  _id: '',
  username: '',
  studentId: '',
  email: '',
  permission: 'requestor',
  n: 0,
};

export const UserReducers = (state: UserStore = initialState, action: any) => {
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
