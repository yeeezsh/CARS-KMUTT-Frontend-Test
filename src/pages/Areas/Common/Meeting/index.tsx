import Loadable from 'react-loadable';

const Areas = Loadable({
  loader: () => import('./Areas'),
  loading: () => null,
});
const FormClub = Loadable({
  loader: () => import('./FormClub'),
  loading: () => null,
});

export { Areas, FormClub };
