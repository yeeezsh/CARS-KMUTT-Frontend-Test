import activityRoomIcon from 'Assets/icons/area/meeting/activity.svg';
import clubRoomIcon from 'Assets/icons/area/meeting/club.svg';
import meetingRoomIcon from 'Assets/icons/area/meeting/meeting.svg';
import Menu from 'Services/menu/interface';

const data: Menu[] = [
  {
    key: '1',
    label: [`ห้องกิจกรรม`],
    icon: activityRoomIcon,
    query: { name: 'activity-room-1' },
    link: '/reserve/area/meeting/meeting-club/',
  },
  {
    key: '2',
    label: [`ห้องชมรม`],
    icon: clubRoomIcon,
    query: { name: 'activity-room-2' },
    link: '/reserve/area/meeting/meeting-club/',
  },
  {
    key: '3',
    label: [`ห้องประชุม 1`],
    icon: meetingRoomIcon,
    query: { name: 'meeting-room-1' },
    link: '/reserve/area/meeting/meeting-room/',
  },
  {
    key: '4',
    label: [`ห้องประชุม 2`],
    icon: meetingRoomIcon,
    query: { name: 'meeting-room-2' },
    link: '/reserve/area/meeting/meeting-room/',
  },
].map(e => ({
  ...e,
  style: 'center',
}));

export default data;
