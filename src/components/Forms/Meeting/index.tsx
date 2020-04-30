import Loadable from 'react-loadable';

const Calendar = Loadable({
  loader: () => import('./Calendar'),
  loading: () => null,
});
const Overview = Loadable({
  loader: () => import('./Overview'),
  loading: () => null,
});

export { Calendar, Overview };
