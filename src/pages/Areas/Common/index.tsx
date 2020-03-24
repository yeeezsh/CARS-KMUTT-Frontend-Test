import Loadable from 'react-loadable';

const Areas = Loadable({
  loader: () => import('./Areas'),
  loading: () => null,
});
const Types = Loadable({
  loader: () => import('./Types'),
  loading: () => null,
});
const Activity = Loadable({
  loader: () => import('./Activity'),
  loading: () => null,
});

export { Areas, Types, Activity };
