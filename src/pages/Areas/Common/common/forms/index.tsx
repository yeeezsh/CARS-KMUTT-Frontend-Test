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
const OverviewCommonForm = Loadable({
  loader: () => import('./overview.common'),
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
const OverviewSportForm = Loadable({
  loader: () => import('./overview.sport'),
  loading: () => null,
});

export {
  RequestorForm,
  ProjectForm,
  FacilityForm,
  OverviewCommonForm,
  AreaForm,
  EquipmentForm,
  ReturnForm,
  OverviewSportForm,
};
