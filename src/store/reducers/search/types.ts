import { TaskSearchDto } from 'Services/task/task.search.service';

export const ON_SEARCH = 'SEARCH/ON_SEARCH';
export const ON_CLEAR = 'SEARCH/ON_CLEAR';
export const ON_QUERY = 'SEARCH/ON_QUERY';
export type OnSearch = string;
export type OnQuery = TaskSearchDto;
