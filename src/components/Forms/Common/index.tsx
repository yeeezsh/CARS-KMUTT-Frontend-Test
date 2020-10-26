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
const AreaForm = Loadable({
  loader: () => import('./area'),
  loading: () => null,
});
const EquipmentForm = Loadable({
  loader: () => import('./equipment'),
  loading: () => null,
});
const ReturnForm = Loadable({
  loader: () => import('./return'),
  loading: () => null,
});

// overview components
const OverviewCommonSportForm = Loadable({
  loader: () => import('./OverviewCommonSportForm'),
  loading: () => null,
});
const OverviewCommonForm = Loadable({
  loader: () => import('./OverviewCommonForm'),
  loading: () => null,
});

export {
  RequestorForm,
  ProjectForm,
  FacilityForm,
  AreaForm,
  EquipmentForm,
  ReturnForm,
  OverviewCommonForm,
  OverviewCommonSportForm,
};
