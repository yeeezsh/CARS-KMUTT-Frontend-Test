import Loadable from 'react-loadable';

const Category = Loadable({
  loader: () => import('./Areas'),
  loading: () => null,
});
const PageSport = Loadable({
  loader: () => import('./SportPage'),
  loading: () => null,
});

export { Category, PageSport as Page };
