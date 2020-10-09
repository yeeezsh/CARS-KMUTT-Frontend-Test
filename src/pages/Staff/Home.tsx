// assets
import allDocsIcon from 'Assets/icons/staff/alldocs.svg';
import useSearchQuery from 'Hooks/search.query';
import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import Loadable from 'react-loadable';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import { taskTable } from 'Services/taskTable';
import { TaskTableTypeAPI } from 'Services/taskTable/interface';
import { RootReducersType } from 'Store/reducers';
import { onSetType } from 'Store/reducers/search/actions';
import useReadyQuery from './hooks/useReadyQuery';

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
  const ready = useReadyQuery(current, size, orderCol, order);
  const dispatch = useDispatch();

  function setQueryString() {
    history.replace(
      `/staff?current=${current || 1}&size=${size}&orderlCol=${orderCol ||
        DEFAULT_ORDER_COL}&order=${order || '-1'}`,
    );
  }

  // search
  const dataSearchQuery = useSelector(
    (s: RootReducersType) => s.SearchReducers,
  );
  useSearchQuery(
    { current, size, orderCol, order },
    setData,
    setLoading,
    'all',
  );

  // fetching
  useEffect(() => {
    setQueryString();
    setLoading(true);
    ready &&
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
    dispatch(onSetType([]));
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
        disablePagination={dataSearchQuery.s.length !== 0}
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
