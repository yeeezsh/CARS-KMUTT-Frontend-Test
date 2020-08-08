import User from 'Services/user/interface';
import { QuotaType } from 'Services/user/quota.interface';
import { DELETE_USER, SET_USER } from './actions';

export type UserReducer = User & QuotaType;

const initialState: UserReducer = {
  _id: '',
  username: '',
  studentId: '',
  email: '',
  group: '',
  n: 0,
};

export const UserReducers = (
  state: UserReducer = initialState,
  action: any,
): UserReducer => {
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
