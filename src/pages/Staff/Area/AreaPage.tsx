import React from 'react';
import { TaskType } from 'Services/task/task.interface';
import Factory from './Factory';

const AreaPage: React.FC = () => {
  const page = Factory(TaskType.sport);
  return page;
};

export default AreaPage;
