import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { TaskTableTypeAPI } from 'Services/taskTable/interface';
import { onClear, onSearch } from './actions';
import { OnSearch } from './types';
export interface SearchState {
  s: string;
  vid?: string;
  areaName?: string;
  requestorName?: string;
  date?: string;
  data: TaskTableTypeAPI;
  loading: boolean;
}
const initState: SearchState = {
  s: '',
  data: { count: 0, data: [] },
  loading: false,
};

export const SearchReducers = createReducer(initState, {
  [onSearch.type]: (state, action: PayloadAction<OnSearch>) => ({
    ...state,
    s: action.payload.s,
  }),
  [onClear.type]: () => initState,
});
