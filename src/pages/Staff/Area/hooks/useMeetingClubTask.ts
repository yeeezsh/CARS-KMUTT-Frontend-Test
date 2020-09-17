import { message } from 'antd';
import { Moment } from 'moment';
import { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router';
import SelectedDateType from '../@types/selected.date.type';

type OnReset = () => void;
type useMeetingClubTask = [OnReset];
function useMeetingClubTask(
  selectedDate: SelectedDateType,
  fetch: (startDate: Moment, stopDate: Moment) => void,
) {
  const history = useHistory();
  const { pathname } = useLocation();

  function reset() {
    const correctPath = pathname
      .split('/')
      .slice(0, 4)
      .join('/');
    console.log('rset', correctPath);
    return history.replace(correctPath + '/1');
  }

  //pattern pathname test for value sync
  useEffect(() => {
    const correctPath = pathname
      .split('/')
      .slice(0, 4)
      .join('/');
    history.replace(correctPath + '/1');
  }, []);

  return [
    () => {
      fetch(selectedDate.start, selectedDate.stop);
      reset();
      return message.success('จองสำเร็จ', 5);
    },
  ];
}
export default useMeetingClubTask;
