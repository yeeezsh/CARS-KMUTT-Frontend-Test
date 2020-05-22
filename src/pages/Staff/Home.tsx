import React, { useState, useEffect } from 'react';
import Loadable from 'react-loadable';
import { taskTable } from 'Models/taskTable';
import { TaskTableTypeAPI } from 'Models/taskTable/interface';

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

const LIMIT = 10;

function StaffHome() {
  // const now = moment().startOf('day');
  // const pagination = moment(now).subtract(2, 'day');
  const initState: TaskTableTypeAPI = { data: [], count: 0 };
  const [data, setData] = useState(initState);
  const [current, setCurrent] = useState(1);
  const [size, setSize] = useState(LIMIT);
  const [orderCol, setOrderCol] = useState('');
  const [order, setOrder] = useState<undefined | 1 | -1>(undefined);

  // fetching
  useEffect(() => {
    taskTable
      .getAllTask(current, size, orderCol, order)
      .then(e => setData(e));
  }, [current, size, orderCol, order]);

  return (
    <StaffLayout>
      <TaskTable
        title="รายการทั้งหมด"
        icon={allDocsIcon}
        data={data.data}
        allDataCount={data.count}
        dataRequest={(pagination, order) => {
          setCurrent(pagination.current);
          setSize(pagination.pageSize);
          setOrderCol(order.column);
          setOrder(order.order);
          console.log('sort or pagination client requested');
          console.log(pagination, order);
        }}
      />
    </StaffLayout>
  );
}

export default StaffHome;
