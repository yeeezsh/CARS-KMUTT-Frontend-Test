import React, { useState, useEffect } from 'react';
import moment from 'moment';
import StaffLayout from 'Components/Layout/Staff/Home';
import TaskTable from 'Components/TaskTable';
import { taskTable } from 'Models/taskTable';

import allDocsIcon from 'Assets/icons/staff/alldocs.svg';

function StaffHome() {
  const now = moment().startOf('day');
  const pagination = moment(now).subtract(2, 'day');
  const [data, setData] = useState([]);
  console.log(now.format('DD-MM-YYYY'));
  console.log(pagination.format('DD-MM-YYYY'));

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
