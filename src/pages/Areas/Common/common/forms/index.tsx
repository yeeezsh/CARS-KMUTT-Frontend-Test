import Loadable from 'react-loadable';

const RequestorForm = Loadable({
  loader: () => import('./requestor'),
  loading: () => null,
});
const ProjectForm = Loadable({
  loader: () => import('./project'),
  loading: () => null,
});
const FacilityForm = Loadable({
  loader: () => import('./facility'),
  loading: () => null,
});
const OverviewGeneralForm = Loadable({
  loader: () => import('./overview.general'),
  loading: () => null,
});

export { RequestorForm, ProjectForm, FacilityForm, OverviewGeneralForm };
