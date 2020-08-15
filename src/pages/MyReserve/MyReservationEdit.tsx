import ReservationInfoEdit from 'Components/ReservationInfo/ReservationInfoEdit';
import Activity from 'Pages/Areas/Common/Activity';
import Sport from 'Pages/Areas/Common/Sport';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { taskAPI } from 'Services/task';
import { taskFormAPI } from 'Services/task/form';
import { Task, TaskType } from 'Services/task/task.interface';
import { RootReducersType } from 'Store/reducers';
import {
  setAreaInfoForm,
  setFilledForm,
} from 'Store/reducers/areaForm/actions';
import { AreaInfo } from 'Store/reducers/areaForm/types';

const FormFactory = (
  type: Task['type'],
  forms: any,
  area: Task['area'],
  onSubmit: <T>(forms: T) => void,
) => {
  switch (type) {
    case TaskType.common:
      return <Activity noInit={true} editMode={true} onSend={onSubmit} />;
    case TaskType.commonSport:
      return <Sport />;
    default:
      return <div>no support</div>;
  }
};

const MyReservationEdit: React.FC = props => {
  const [task, setTask] = useState<Task>();
  const { id: taskId } = useParams<{ id: string }>();
  const forms = useSelector((s: RootReducersType) => s.AreaFormReducers);
  const dispatch = useDispatch();

  useEffect(() => {
    taskAPI.getTaskById(taskId).then(t => {
      setTask(t);
      console.log('tttttt', t);
      dispatch(setAreaInfoForm(t?.area as AreaInfo));
      dispatch(setFilledForm(t?.forms));
    });
  }, [taskId]);

  console.log('task id', taskId, task, task?.type);

  function onSubmit<T>(data: T) {
    console.log('on edit', data);
    // task?._id &&
    taskFormAPI.updateTask({ id: task?._id, ...(data as any) });
    return;
  }

  const FormElement =
    task?.area &&
    FormFactory(task?.type, task?.forms, task?.area, onSubmit);
  console.log('form elem', FormElement);
  return (
    <div>
      <ReservationInfoEdit />
      {FormElement}
    </div>
  );
};

export default MyReservationEdit;
