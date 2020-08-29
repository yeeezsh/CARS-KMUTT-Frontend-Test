import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { TaskStateType } from 'Services/task/task.interface';
import { TaskTableTypeAPI } from 'Services/taskTable/interface';
import { onClear, onQuery, onSearch, onSetType } from './actions';
import { OnSearch, OnSetType } from './types';
export interface SearchState {
  s: string;
  vid?: string;
  areaName?: string;
  requestorName?: string;
  date?: string;
  data: TaskTableTypeAPI;
  loading: boolean;
  error: boolean;
  type: TaskStateType[];
}
const initState: SearchState = {
  s: '',
  data: { count: 0, data: [] },
  loading: false,
  error: false,
  type: [],
};

export const SearchReducers = createReducer(initState, {
  [onSearch.type]: (state, action: PayloadAction<OnSearch>) => {
    return {
      ...state,
      s: action.payload,
    };
  },
  [onClear.type]: () => initState,
  [onSetType.type]: (state, action: PayloadAction<OnSetType>) => {
    return {
      ...state,
      type: action.payload,
    };
  },
  [onQuery.pending.type]: state => ({
    ...state,
    loading: true,
    error: false,
  }),
  [onQuery.fulfilled.type]: (
    state,
    action: PayloadAction<TaskTableTypeAPI>,
  ) => ({ ...state, data: action.payload, loading: false, error: false }),
  [onQuery.rejected.type]: state => ({
    ...state,
    loading: false,
    error: true,
  }),
});
