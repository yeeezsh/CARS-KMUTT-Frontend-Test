import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Loadable from 'react-loadable';
import { taskTable } from 'Models/taskTable';
import { TaskTableType } from 'Models/taskTable/interface';

// assets
import rejectDocsIcon from 'Assets/icons/staff/rejectdocs.svg';

const StaffLayout = Loadable({
  loader: () => import('Components/Layout/Staff/Home'),
  loading: () => null,
});
const TaskTable = Loadable({
  loader: () => import('Components/TaskTable'),
  loading: () => null,
});

function StaffReject() {
  const now = moment().startOf('day');
  const pagination = moment(now).subtract(2, 'day');
  const initState: TaskTableType = [];
  const [data, setData] = useState(initState);
  console.log(now.format('DD-MM-YYYY'));
  console.log(pagination.format('DD-MM-YYYY'));

  // fetching
  useEffect(() => {
    taskTable.getRejectTask(now, pagination).then(e => setData(e));
  }, []);

  return (
    <StaffLayout>
      <TaskTable title="ตีกลับ" icon={rejectDocsIcon} data={data} />
    </StaffLayout>
  );
}

export default StaffReject;
