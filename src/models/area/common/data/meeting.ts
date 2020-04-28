import activityRoomIcon from 'Assets/icons/area/meeting/activity.svg';
import clubRoomIcon from 'Assets/icons/area/meeting/club.svg';
import meetingRoomIcon from 'Assets/icons/area/meeting/meeting.svg';

import Menu from 'Models/menu/interface';

const data: Menu[] = [
  {
    key: '1',
    label: [`ห้องกิจกรรม`],
    icon: activityRoomIcon,
    query: { name: 'activity-room-1' },
  },
  {
    key: '2',
    label: [`ห้องชมรม`],
    icon: clubRoomIcon,
    query: { name: 'activity-room-2' },
  },
  {
    key: '3',
    label: [`ห้องประชุม 1`],
    icon: meetingRoomIcon,
    query: { name: 'meeting-room-1' },
  },
  {
    key: '4',
    label: [`ห้องประชุม 2`],
    icon: meetingRoomIcon,
    query: { name: 'meeting-room-2' },
  },
].map(e => ({
  ...e,
  style: 'center',
  link: '/reserve/area/meeting/',
}));

export default data;
