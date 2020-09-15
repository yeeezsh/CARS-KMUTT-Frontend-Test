import { message } from 'antd';
import TimeNode from 'Components/TimeTable/timetable.interface';
import { Moment } from 'moment';
import { AreaAPI } from 'Services/area/interfaces';
import { taskAPI } from 'Services/task';
import { CreateTaskByStaff } from 'Services/task/task.create.interface';
import { UserClass } from 'Services/user';
import SelectedDateType from '../@types/selected.date.type';

async function callAPI(
  u: UserClass,
  areaInfo: AreaAPI,
  selectedDate: SelectedDateType | undefined,
  selecting: TimeNode[][],
  onCancel: () => void,
  fetchData: (startDate: Moment, stopDate: Moment) => void,
) {
  const parser: CreateTaskByStaff = {
    time: [],
    area: areaInfo._id,
    owner: u.GetUser()._id,
    requestor: [u.GetUser().username],
  };
  if (!areaInfo) throw new Error('need area info');
  const mapped = selecting
    .map(e => ({
      ...parser,
      time: e.map(t => ({
        start: t.value.toDate(),
        stop: t.value
          .add(areaInfo.reserve[0].interval, 'minutes')
          .toDate(),
        allDay: false,
      })),
    }))
    .filter(e => e.time.length > 0);

  await Promise.all(mapped.map(e => taskAPI.createSportTaskByStaff(e)));
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
): ((selectedDate: SelectedDateType, selecting: TimeNode[][]) => void)[] {
  try {
    return [
      (selectedDate, selecting) => {
        callAPI(u, areaInfo, selectedDate, selecting, onCancel, fetchData);
      },
    ];
  } catch (err) {
    message.error(String(err));
    throw new Error(String(err));
  }
}

export default useOnRserveTimeTableAPI;
