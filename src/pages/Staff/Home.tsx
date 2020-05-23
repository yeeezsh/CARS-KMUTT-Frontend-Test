import React, { useState, useEffect } from 'react';
import Loadable from 'react-loadable';
import queryString, { ParsedQuery } from 'query-string';

import { taskTable } from 'Models/taskTable';
import { TaskTableTypeAPI } from 'Models/taskTable/interface';

// assets
import allDocsIcon from 'Assets/icons/staff/alldocs.svg';
import { useHistory, useLocation } from 'react-router';

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
  const history = useHistory();
  const loaction = useLocation();
  const initState: TaskTableTypeAPI = { data: [], count: 0 };
  const [data, setData] = useState(initState);
  const [current, setCurrent] = useState(1);
  const [size, setSize] = useState(LIMIT);
  const [orderCol, setOrderCol] = useState<string>('createAt');
  const [order, setOrder] = useState<undefined | 1 | -1>(undefined);
  const [loading, setLoading] = useState<boolean>(true);

  // fetching
  useEffect(() => {
    history.replace(
      `/staff?current=${current}&size=${size}&orderlCol=${orderCol ||
        'createAt'}&order=${order}`,
    );
    setLoading(true);
    taskTable.getAllTask(current, size, orderCol, order).then(e => {
      setData(e);
      setLoading(false);
    });
  }, [current, size, orderCol, order]);

  // once load
  useEffect(() => {
    const query = queryString.parse(loaction.search);
    setCurrent(Number(query.current));
    setSize(Number(query.size));
    setOrderCol(String(query.orderlCol));
    setOrder(Number(query.order) as 1 | -1);
    console.log('query config', query, Number(query.current));
  }, []);

  return (
    <StaffLayout>
      <TaskTable
        loading={loading}
        current={current}
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
