import Loadable from 'react-loadable';

const Areas = Loadable({
  loader: () => import('./AreasCommonPage'),
  loading: () => null,
});
const TypesWSport = Loadable({
  loader: () => import('./AreaCommonCategoryTypes'),
  loading: () => null,
});
const Activity = Loadable({
  loader: () => import('./Activity'),
  loading: () => null,
});
const Sport = Loadable({
  loader: () => import('./Sport'),
  loading: () => null,
});

export { Areas, TypesWSport, Activity, Sport };
