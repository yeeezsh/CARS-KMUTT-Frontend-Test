import React from 'react';
import { TaskType } from 'Services/task/task.interface';
import AreaPageSport from './AreaPageSportTask';

export type AreaPageFactoryType = TaskType;

// eslint-disable-next-line react/display-name
export default (type: AreaPageFactoryType): JSX.Element => {
  switch (type) {
    case TaskType.sport:
      return <AreaPageSport />;
    default:
      return <div>type not supported</div>;
  }
};
