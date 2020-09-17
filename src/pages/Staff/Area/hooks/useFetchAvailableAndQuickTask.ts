import TimeNode from 'Components/TimeTable/timetable.interface';
import { Moment } from 'moment';
import { useState } from 'react';
import { areaAPI } from 'Services/area';
import { AreaAvailableAPI } from 'Services/area/@interfaces/area.available.interface';
import { AreaServiceResponseAPI } from 'Services/area/@interfaces/area.interfaces';
import { taskAPI } from 'Services/task';
import { QuickTask as QuickTaskInterface } from 'Services/task/task.quick.interface';

async function fetch(
  startDate: Moment,
  stopDate: Moment,
  areaInfo: AreaServiceResponseAPI,
  setSelecting: React.Dispatch<React.SetStateAction<TimeNode[][]>>,
  setAvailArea: React.Dispatch<
    React.SetStateAction<AreaAvailableAPI[] | undefined>
  >,
  setQuickTask: React.Dispatch<React.SetStateAction<QuickTaskInterface[]>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
) {
  setLoading(true);

  if (!areaInfo._id) throw new Error('must area id before');

  // fetch avalable
  const available = await areaAPI.getAreaAvailable(
    areaInfo._id,
    startDate,
    stopDate,
  );
  setAvailArea(available);
  setSelecting(Array(available.length).fill([]));

  // get quick task
  const quickTaskAPIResponse = await taskAPI.getQuickTask(
    areaInfo._id,
    startDate,
    stopDate,
  );
  setQuickTask(quickTaskAPIResponse);
  setLoading(false);
}

function useFetchAvailableAndQuickTask(
  areaInfo: AreaServiceResponseAPI,
  setSelecting: React.Dispatch<React.SetStateAction<TimeNode[][]>>,
): [
  QuickTaskInterface[],
  AreaAvailableAPI[] | undefined,
  boolean,
  (startDate: Moment, stopDate: Moment) => void,
] {
  const initQuickTask: QuickTaskInterface[] = [];
  const [quickTask, setQuickTask] = useState(initQuickTask);
  const [availArea, setAvailArea] = useState<AreaAvailableAPI[]>();
  const [loading, setLoading] = useState<boolean>(true);

  return [
    quickTask,
    availArea,
    loading,

    //fetch
    (startDate: Moment, stopDate: Moment) => {
      fetch(
        startDate,
        stopDate,
        areaInfo,
        setSelecting,
        setAvailArea,
        setQuickTask,
        setLoading,
      );
    },
  ];
}

export default useFetchAvailableAndQuickTask;
