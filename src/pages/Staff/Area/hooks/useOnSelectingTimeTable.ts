import TimeNode from 'Components/TimeTable/timetable.interface';
import moment, { Moment } from 'moment';
import { useState } from 'react';
import SelectedDateType from '../@types/selected.date.type';

function onSelect(
  value: Moment,
  type: TimeNode['type'],
  i: number,
  selecting: TimeNode[][],
  setSelecting: React.Dispatch<React.SetStateAction<TimeNode[][]>>,
) {
  console.log(value, type, i);
  const selectingDay = selecting[i];
  if (type === 'disabled') return;
  if (type === 'available') {
    const d: TimeNode[] = [...selectingDay, { value, type: 'selecting' }];
    setSelecting(prev => prev.map((e, ix) => (ix === i ? d : e)));
  }
  if (type === 'selecting') {
    const d: TimeNode[] = selectingDay.filter(
      f => moment(f.value).format('HH:mm') !== value.format('HH:mm'),
    );
    setSelecting(prev => prev.map((e, ix) => (ix === i ? d : e)));
  }
}

function useOnSelectingTimeTable(): [
  // seleting
  TimeNode[][],
  React.Dispatch<React.SetStateAction<TimeNode[][]>>,
  // selected
  SelectedDateType,
  React.Dispatch<React.SetStateAction<SelectedDateType>>,
  // on select
  (value: Moment, type: TimeNode['type'], i: number) => void,
] {
  const initSelecting: TimeNode[][] = [[]];
  const [selecting, setSelecting] = useState(initSelecting);

  const [selectedDate, setSelectedDate] = useState<SelectedDateType>({
    start: moment(),
    stop: moment(),
  });

  return [
    selecting,
    setSelecting,
    selectedDate,
    setSelectedDate,
    (value, type, i) => {
      onSelect(value, type, i, selecting, setSelecting);
      return;
    },
  ];
}

export default useOnSelectingTimeTable;
