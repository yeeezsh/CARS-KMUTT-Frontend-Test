import Loadable from 'react-loadable';

const Calendar = Loadable({
  loader: () => import('./Calendar'),
  loading: () => null,
});

export { Calendar };
