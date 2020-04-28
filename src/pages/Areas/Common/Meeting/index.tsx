import Loadable from 'react-loadable';

const Areas = Loadable({
  loader: () => import('./Areas'),
  loading: () => null,
});

export { Areas };
