import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import {
  TaskSearchDto,
  taskSearchService,
} from 'Services/task/task.search.service';
import withPayload from '../common/wthPayload';
import { OnSearch, ON_CLEAR, ON_QUERY, ON_SEARCH } from './types';

export const onSearch = createAction(ON_SEARCH, withPayload<OnSearch>());
export const onClear = createAction(ON_CLEAR);
export const onQuery = createAsyncThunk(
  ON_QUERY,
  async (query: TaskSearchDto) => {
    const res = await taskSearchService.search(query);
    return res;
  },
);
