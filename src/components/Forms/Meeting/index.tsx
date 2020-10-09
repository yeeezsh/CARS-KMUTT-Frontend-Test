import Loadable from 'react-loadable';

const Calendar = Loadable({
  loader: () => import('./Calendar'),
  loading: () => null,
});
const OverviewMeeting = Loadable({
  loader: () => import('./OverviewMeeting'),
  loading: () => null,
});

export { Calendar, OverviewMeeting };
