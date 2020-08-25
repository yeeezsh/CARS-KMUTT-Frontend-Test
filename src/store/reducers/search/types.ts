import { TaskStateType } from 'Services/task/task.interface';
import { TaskSearchDto } from 'Services/task/task.search.service';

export const ON_SEARCH = 'SEARCH/ON_SEARCH';
export const ON_CLEAR = 'SEARCH/ON_CLEAR';
export const ON_QUERY = 'SEARCH/ON_QUERY';
export const ON_SET_TYPE = 'SEARCH/ON_SET_TYPE';

export type OnSearch = string;
export type OnQuery = TaskSearchDto;
export type OnSetType = TaskStateType[];
