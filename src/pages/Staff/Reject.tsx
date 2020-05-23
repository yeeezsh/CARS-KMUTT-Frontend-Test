import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import Loadable from 'react-loadable';

// data & store
import { taskTable } from 'Models/taskTable';
import { TaskTableTypeAPI } from 'Models/taskTable/interface';

// assets
import rejectDocsIcon from 'Assets/icons/staff/rejectdocs.svg';
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
const DEFAULT_ORDER_COL = 'createAt';

function StaffReject() {
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
      `/staff/reject?current=${current ||
        1}&size=${size}&orderlCol=${orderCol ||
        DEFAULT_ORDER_COL}&order=${order || '-1'}`,
    );
  }

  // fetching
  useEffect(() => {
    setQueryString();
    setLoading(true);
    taskTable.getRejectTask(current, size, orderCol, order).then(e => {
      setData(e);
      setLoading(false);
    });
  }, [current, size, orderCol, order]);

  // once load
  useEffect(() => {
    const query = queryString.parse(loaction.search);
    setQueryString();
    setCurrent(Number(query.current));
    setSize(Number(query.size));
    setOrderCol(String(query.orderlCol));
    setOrder(Number(query.order) as 1 | -1);
  }, []);

  return (
    <StaffLayout>
      <TaskTable
        title="ตีกลับ"
        icon={rejectDocsIcon}
        data={data.data}
        loading={loading}
        current={current}
        allDataCount={data.count}
        dataRequest={(pagination, order) => {
          setCurrent(pagination.current);
          setSize(pagination.pageSize);
          setOrderCol(order.column);
          setOrder(order.order);
        }}
      />
    </StaffLayout>
  );
}

export default StaffReject;
