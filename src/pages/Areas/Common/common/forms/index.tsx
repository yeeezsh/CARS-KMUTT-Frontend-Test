import Loadable from 'react-loadable';

const RequestorForm = Loadable({
  loader: () => import('./requestor'),
  loading: () => null,
});

export { RequestorForm };
