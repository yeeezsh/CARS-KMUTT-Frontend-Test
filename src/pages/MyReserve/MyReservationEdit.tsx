import ReservationInfoEdit from 'Components/ReservationInfo/ReservationInfoEdit';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { taskAPI } from 'Services/task';
import { Task } from 'Services/task/task.interface';

const FormFactory = (type: Task['type']) => {
  return;
};

const MyReservationEdit: React.FC = props => {
  const [task, setTask] = useState<Task>();
  const { id: taskId } = useParams<{ id: string }>();

  useEffect(() => {
    taskAPI.getTaskById(taskId).then(t => setTask(t));
  }, []);

  console.log(taskId, task);
  return (
    <div>
      <ReservationInfoEdit />
    </div>
  );
};

export default MyReservationEdit;
