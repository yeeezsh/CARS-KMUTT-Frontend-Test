import Loadable from 'react-loadable';

const CalendarMeeting = Loadable({
  loader: () => import('./CalendarMeeting'),
  loading: () => null,
});
const OverviewMeeting = Loadable({
  loader: () => import('./OverviewMeeting'),
  loading: () => null,
});

export { CalendarMeeting, OverviewMeeting };
