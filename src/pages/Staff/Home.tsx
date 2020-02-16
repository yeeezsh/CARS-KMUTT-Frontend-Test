import React, { useState, useEffect } from 'react';
import moment from 'moment';
import StaffLayout from 'Components/Layout/Staff/Home';
import TaskTable from 'Components/TaskTable';
import { taskTable } from 'Models/taskTable';

import allDocsIcon from 'Assets/icons/staff/alldocs.svg';

function StaffHome() {
  const now = moment().startOf('day');
  const pagination = moment(now).add(1, 'day');
  const [data, setData] = useState([]);

  // fetching
  useEffect(() => {
    taskTable.getAllTask(now, pagination).then(e => setData(e));
  }, []);

  return (
    <StaffLayout>
      home staff ja
      <TaskTable title="รายการทั้งหมด" icon={allDocsIcon} data={data} />
    </StaffLayout>
  );
}

export default StaffHome;
