import Loadable from 'react-loadable';

const Category = Loadable({
  loader: () => import('./Category'),
  loading: () => null,
});
const PageSport = Loadable({
  loader: () => import('./Page'),
  loading: () => null,
});

export { Category, PageSport as Page };
