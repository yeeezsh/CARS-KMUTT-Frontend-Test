// assets
import dropDocsIcon from 'Assets/icons/staff/dropdocs.svg';
import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import Loadable from 'react-loadable';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { TaskStateType } from 'Services/task/task.interface';
// data & store
import { taskTable } from 'Services/taskTable';
import { TaskTableTypeAPI } from 'Services/taskTable/interface';
import { RootReducersType } from 'Store/reducers';
import { onSetType } from 'Store/reducers/search/actions';

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

function StaffDrop() {
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
  const dispatch = useDispatch();

  function setQueryString() {
    history.replace(
      `/staff/drop?current=${current || 1}&size=${size ||
        LIMIT}&orderlCol=${orderCol || DEFAULT_ORDER_COL}&order=${order ||
        '-1'}`,
    );
  }

  // search
  const dataSearchQuery = useSelector(
    (s: RootReducersType) => s.SearchReducers,
  );
  useEffect(() => {
    if (!dataSearchQuery.error && !dataSearchQuery.loading)
      setData(dataSearchQuery.data);

    if (dataSearchQuery.s.length === 0) {
      taskTable.getAllTask(current, size, orderCol, order).then(e => {
        setData(e);
        setLoading(false);
      });
    }
  }, [dataSearchQuery.loading]);

  // fetching
  useEffect(() => {
    setQueryString();
    setLoading(true);
    taskTable.getDropTask(current, size, orderCol, order).then(e => {
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
    dispatch(onSetType([TaskStateType.drop]));
  }, []);
  return (
    <StaffLayout>
      <TaskTable
        title="ไม่อนุมัติ"
        icon={dropDocsIcon}
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

export default StaffDrop;
