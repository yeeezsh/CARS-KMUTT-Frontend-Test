import React, { ReactElement } from 'react';
import StaffLayout from 'Components/Layout/Staff/Home';
import { useLocation } from 'react-router';

function TaskPage(props): ReactElement {
  const location = useLocation();
  const taskId = location.pathname.split('/')[3];
  console.log(taskId);
  return <StaffLayout>task id</StaffLayout>;
}

export default TaskPage;
