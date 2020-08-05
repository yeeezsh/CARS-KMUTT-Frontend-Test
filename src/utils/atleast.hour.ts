import TimeNode from 'Components/TimeTable/timetable.interface';

export default (timeNode: TimeNode[]): boolean => {
  if (timeNode.length >= 2) return true;
  return false;
};
