// assets
import allDocsIcon from 'Assets/icons/staff/alldocs.svg';
import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import Loadable from 'react-loadable';
import { useHistory, useLocation } from 'react-router';
import { taskTable } from 'Services/taskTable';
import { TaskTableTypeAPI } from 'Services/taskTable/interface';

const StaffLayout = Loadable({
  loader: () => import('Components/Layout/Staff/Home'),
  loading: () => null,
});
const TaskTable = Loadable({
  loader: () => import('Components/TaskTable'),
  loading: () => null,
});

const LIMIT = 10;
const DEFAULT_ORDER_COL = 'createAt';

function StaffHome() {
  const history = useHistory();
  const loaction = useLocation();
  const [data, setData] = useState<TaskTableTypeAPI>({
    data: [],
    count: 0,
  });
  const [current, setCurrent] = useState(1);
  const [size, setSize] = useState(LIMIT);
  const [orderCol, setOrderCol] = useState<string>(DEFAULT_ORDER_COL);
  const [order, setOrder] = useState<undefined | 1 | -1>(undefined);
  const [loading, setLoading] = useState<boolean>(true);

  function setQueryString() {
    history.replace(
      `/staff?current=${current || 1}&size=${size}&orderlCol=${orderCol ||
        DEFAULT_ORDER_COL}&order=${order || '-1'}`,
    );
  }

  // fetching
  useEffect(() => {
    setQueryString();
    setLoading(true);
    taskTable.getAllTask(current, size, orderCol, order).then(e => {
      setData(e);
      setLoading(false);
    });
  }, [current, size, orderCol, order]);

  // once load
  useEffect(() => {
    const query = queryString.parse(loaction.search);
    setQueryString();
    setCurrent(Number(query.current || 1));
    setSize(Number(query.size || LIMIT));
    setOrderCol(String(query.orderlCol || DEFAULT_ORDER_COL));
    setOrder(Number(query.order) as 1 | -1);
    console.log('query config', query, Number(query.current));
  }, []);

  return (
    <StaffLayout>
      <TaskTable
        title="รายการทั้งหมด"
        icon={allDocsIcon}
        data={data.data}
        loading={loading}
        current={current}
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
