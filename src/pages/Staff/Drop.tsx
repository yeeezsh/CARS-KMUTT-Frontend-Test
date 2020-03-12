import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Loadable from 'react-loadable';
import { taskTable } from 'Models/taskTable';
import { TaskTableType } from 'Models/taskTable/interface';

// assets
import acceptDocsIcon from 'Assets/icons/staff/acceptdocs.svg';

const StaffLayout = Loadable({
  loader: () => import('Components/Layout/Staff/Home'),
  loading: () => null,
});
const TaskTable = Loadable({
  loader: () => import('Components/TaskTable'),
  loading: () => null,
});

function StaffDrop() {
  const now = moment().startOf('day');
  const pagination = moment(now).subtract(2, 'day');
  const initState: TaskTableType = [];
  const [data, setData] = useState(initState);
  console.log(now.format('DD-MM-YYYY'));
  console.log(pagination.format('DD-MM-YYYY'));

  // fetching
  useEffect(() => {
    taskTable.getDropTask(now, pagination).then(e => setData(e));
  }, []);

  return (
    <StaffLayout>
      <TaskTable title="ไม่อนุมัติ" icon={acceptDocsIcon} data={data} />
    </StaffLayout>
  );
}

export default StaffDrop;
