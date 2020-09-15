import { message } from 'antd';
import TimeNode from 'Components/TimeTable/timetable.interface';
import { Moment } from 'moment';
import AreaBuildingEnum from 'Services/area/@enums/area.building.enum';
import { AreaAPI } from 'Services/area/interfaces';
import { taskAPI } from 'Services/task';
import { taskMeetingAPI } from 'Services/task/meeting';
import { CreateTaskMeeting } from 'Services/task/meeting/interface';
import { CreateTaskByStaff } from 'Services/task/task.create.interface';
import { UserClass } from 'Services/user';
import SelectedDateType from '../@types/selected.date.type';

function selectingToDateAPI(e: TimeNode[], areaInfo: AreaAPI) {
  return e.map(t => ({
    start: t.value.toDate(),
    stop: t.value.add(areaInfo.reserve[0].interval, 'minutes').toDate(),
    allDay: false,
  }));
}

async function sportTaskAPI(
  selecting: TimeNode[][],
  areaInfo: AreaAPI,
  u: UserClass,
) {
  const parser: CreateTaskByStaff = {
    time: [],
    area: areaInfo._id,
    owner: u.GetUser()._id,
    requestor: [u.GetUser().username],
  };
  const mapped = selecting
    .map(e => ({
      ...parser,
      time: selectingToDateAPI(e, areaInfo),
    }))
    .filter(e => e.time.length > 0);
  await Promise.all(mapped.map(e => taskAPI.createSportTaskByStaff(e)));
}

async function meetingTaskAPI(selecting: TimeNode[][], areaInfo: AreaAPI) {
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
  areaInfo: AreaAPI,
  selectedDate: SelectedDateType | undefined,
  selecting: TimeNode[][],
  onCancel: () => void,
  fetchData: (startDate: Moment, stopDate: Moment) => void,
  API: AreaBuildingEnum,
) {
  if (!areaInfo) throw new Error('need area info');

  switch (API) {
    case AreaBuildingEnum.sport:
      await sportTaskAPI(selecting, areaInfo, u);
      break;
    case AreaBuildingEnum.meeting:
      await meetingTaskAPI(selecting, areaInfo);
      break;
  }

  // taskMeetingAPI.createMeetingTask({ time: mapped, area: areaInfo._id });

  selectedDate && fetchData(selectedDate.start, selectedDate.stop);
  onCancel();
  return message.success('จองสำเร็จ');
}

function useOnRserveTimeTableAPI(
  u: UserClass,
  areaInfo: AreaAPI,
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
