import TimeNode from 'Components/TimeTable/timetable.interface';
import moment, { Moment } from 'moment';

export default (
  timeNode: TimeNode[],
  value: Moment,
  interval: number,
): boolean => {
  if (timeNode.length === 0) return true;

  const firstNode = timeNode[0].value;
  const lastNode =
    timeNode[timeNode.length === 1 ? 0 : timeNode.length - 1].value;
  const lowerBound = moment(firstNode)
    .subtract(interval, 'minute')
    .valueOf();
  const upperBound = moment(lastNode)
    .add(interval, 'minute')
    .valueOf();
  const valBound = value.valueOf();

  if (lowerBound <= valBound && valBound <= upperBound) return true;
  return false;
};
