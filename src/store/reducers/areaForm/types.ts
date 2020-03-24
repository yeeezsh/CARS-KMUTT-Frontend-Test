export const ADD_FORM = 'ADD_FORM';
export const INIT_FORM = 'INIT_FORM';

interface AddDataFormAction {
  type: typeof ADD_FORM;
  payload: {};
}
interface InitDataFormAction {
  type: typeof INIT_FORM;
}

export type AreaFormActionTypes = AddDataFormAction | InitDataFormAction;
export interface AreaFormState {
  forms: [];
  canNext: boolean;
  step: number;
  area: Record<string, any>;
}
