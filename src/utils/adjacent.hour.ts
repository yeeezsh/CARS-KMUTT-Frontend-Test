import moment, { Moment } from 'moment';
import TimeNode from 'Components/TimeTable/timetable.interface';

export default (
  timeNode: TimeNode[],
  value: Moment,
  interval: number,
): boolean => {
  if (timeNode.length === 0) return true;
  const firstNode = timeNode[0].value;
  const lastNode =
    timeNode[timeNode.length === 1 ? 0 : timeNode.length - 1].value;
  // if (firstNode === lastNode) return true;
  const lowerBound = moment(firstNode)
    .subtract(interval, 'minute')
    .valueOf();
  const upperBound = moment(lastNode)
    .add(interval, 'minute')
    .valueOf();
  console.log(
    firstNode.format('HH mm'),
    value.format('HH mm'),
    lastNode.format('HH mm'),
  );
  const valBound = value.valueOf();
  if (lowerBound <= valBound && valBound <= upperBound) return true;
  return false;
};
