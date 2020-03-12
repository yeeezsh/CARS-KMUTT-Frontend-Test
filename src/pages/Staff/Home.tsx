import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Loadable from 'react-loadable';
import { taskTable } from 'Models/taskTable';
import { TaskTableType } from 'Models/taskTable/interface';

// assets
import allDocsIcon from 'Assets/icons/staff/alldocs.svg';

const StaffLayout = Loadable({
  loader: () => import('Components/Layout/Staff/Home'),
  loading: () => null,
});
const TaskTable = Loadable({
  loader: () => import('Components/TaskTable'),
  loading: () => null,
});

function StaffHome() {
  const now = moment().startOf('day');
  const pagination = moment(now).subtract(2, 'day');
  const initState: TaskTableType = [];
  const [data, setData] = useState(initState);
  console.log(now.format('DD-MM-YYYY'));
  console.log(pagination.format('DD-MM-YYYY'));

  // fetching
  useEffect(() => {
    taskTable.getAllTask(now, pagination).then(e => setData(e));
  }, []);

  return (
    <StaffLayout>
      <TaskTable title="รายการทั้งหมด" icon={allDocsIcon} data={data} />
    </StaffLayout>
  );
}

export default StaffHome;
