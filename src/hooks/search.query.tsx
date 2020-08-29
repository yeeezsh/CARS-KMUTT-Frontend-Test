import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { TaskStateType } from 'Services/task/task.interface';
import { taskTable, TaskTableQueryType } from 'Services/taskTable';
import { TaskTableTypeAPI } from 'Services/taskTable/interface';
import { RootReducersType } from 'Store/reducers';

function useSearchQuery(
  pagination: {
    current: number;
    size: number;
    orderCol: string;
    order: 1 | -1 | undefined;
  },
  setData: (data: React.SetStateAction<TaskTableTypeAPI>) => void,
  setLoading: (state: React.SetStateAction<boolean>) => void,
  taskStateType: TaskTableQueryType,
) {
  const { current, size, orderCol, order } = pagination;
  const dataSearchQuery = useSelector(
    (s: RootReducersType) => s.SearchReducers,
  );
  useEffect(() => {
    if (!dataSearchQuery.error && !dataSearchQuery.loading)
      setData(dataSearchQuery.data);

    if (dataSearchQuery.s.length === 0) {
      switch (taskStateType) {
        case 'all':
          taskTable.getAllTask(current, size, orderCol, order).then(e => {
            setData(e);
            setLoading(false);
          });
          break;
        case TaskStateType.reject:
          taskTable
            .getRejectTask(current, size, orderCol, order)
            .then(e => {
              setData(e);
              setLoading(false);
            });
        case TaskStateType.accept:
          taskTable
            .getAcceptTask(current, size, orderCol, order)
            .then(e => {
              setData(e);
              setLoading(false);
            });
        case TaskStateType.forward:
          taskTable
            .getForwardTask(current, size, orderCol, order)
            .then(e => {
              setData(e);
              setLoading(false);
            });
        case TaskStateType.wait:
          taskTable.getWaitTask(current, size, orderCol, order).then(e => {
            setData(e);
            setLoading(false);
          });
        case TaskStateType.drop:
          taskTable.getDropTask(current, size, orderCol, order).then(e => {
            setData(e);
            setLoading(false);
          });
      }
    }
  }, [dataSearchQuery.loading]);
}

export default useSearchQuery;
