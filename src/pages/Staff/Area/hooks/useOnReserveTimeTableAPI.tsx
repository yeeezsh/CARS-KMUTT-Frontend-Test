import { message } from 'antd';
import TimeNode from 'Components/TimeTable/timetable.interface';
import { Moment } from 'moment';
import AreaBuildingEnum from 'Services/area/@enums/area.building.enum';
import { AreaServiceResponseAPI } from 'Services/area/@interfaces/area.interfaces';
import { taskAPI } from 'Services/task';
import { taskMeetingAPI } from 'Services/task/meeting';
import { CreateTaskMeeting } from 'Services/task/meeting/interface';
import { CreateTaskByStaff } from 'Services/task/task.create.interface';
import { UserClass } from 'Services/user';
import SelectedDateType from '../@types/selected.date.type';

function selectingToDateAPI(
  e: TimeNode[],
  areaInfo: AreaServiceResponseAPI,
) {
  return e.map(t => ({
    start: t.value.toDate(),
    stop: t.value.add(areaInfo.reserve[0].interval, 'minutes').toDate(),
    allDay: false,
  }));
}

async function sportTaskAPI(
  selecting: TimeNode[][],
  areaInfo: AreaServiceResponseAPI,
  u: UserClass,
) {
  const parser: CreateTaskByStaff = {
    time: [],
    area: areaInfo._id,
    owner: u.GetUser()._id,
    requestor: [u.GetUser().username],
  };
  const mapped = selecting.map(e => ({
    ...parser,
    time: selectingToDateAPI(e, areaInfo),
  }));

  await Promise.all(mapped.map(e => taskAPI.createSportTaskByStaff(e)));
}

async function meetingTaskAPI(
  selecting: TimeNode[][],
  areaInfo: AreaServiceResponseAPI,
) {
  const mapped: CreateTaskMeeting[] = selecting.map(e => ({
    time: selectingToDateAPI(e, areaInfo),
    area: areaInfo._id,
  }));
  await Promise.all(
    mapped.map(e => taskMeetingAPI.createMeetingTaskByStaff(e)),
  );
}

async function callAPI(
  u: UserClass,
  areaInfo: AreaServiceResponseAPI,
  selectedDate: SelectedDateType | undefined,
  selecting: TimeNode[][],
  onCancel: () => void,
  fetchData: (startDate: Moment, stopDate: Moment) => void,
  API: AreaBuildingEnum,
) {
  if (!areaInfo) throw new Error('need area info');

  const selectingFiltered = selecting.filter(e => e.length !== 0);

  switch (API) {
    case AreaBuildingEnum.sport:
      await sportTaskAPI(selectingFiltered, areaInfo, u);
      break;
    case AreaBuildingEnum.meeting:
      await meetingTaskAPI(selectingFiltered, areaInfo);
      break;
  }

  // taskMeetingAPI.createMeetingTask({ time: mapped, area: areaInfo._id });

  selectedDate && fetchData(selectedDate.start, selectedDate.stop);
  onCancel();
  return message.success('จองสำเร็จ');
}

function useOnRserveTimeTableAPI(
  u: UserClass,
  areaInfo: AreaServiceResponseAPI,
  onCancel: () => void,
  fetchData: (startDate: Moment, stopDate: Moment) => void,
  API: AreaBuildingEnum,
): ((selectedDate: SelectedDateType, selecting: TimeNode[][]) => void)[] {
  try {
    return [
      (selectedDate, selecting) => {
        callAPI(
          u,
          areaInfo,
          selectedDate,
          selecting,
          onCancel,
          fetchData,
          API,
        );
      },
    ];
  } catch (err) {
    message.error(String(err));
    throw new Error(String(err));
  }
}

export default useOnRserveTimeTableAPI;
