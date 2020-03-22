import Loadable from 'react-loadable';

const Category = Loadable({
  loader: () => import('./Category'),
  loading: () => null,
});

export { Category };
